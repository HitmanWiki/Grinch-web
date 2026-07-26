import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // ====== IMPORTANT: Serve static assets from public folder ======
  // This must come BEFORE Vite middleware
  app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')));
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

  // ====== SERVE STATIC HTML PAGES ======
  // Serve wallofart.html
  app.get("/wallofart", (req, res) => {
    const wallOfArtPath = path.join(process.cwd(), "public", "wallofart.html");
    res.sendFile(wallOfArtPath, (err) => {
      if (err) {
        console.error("Error serving wallofart.html:", err);
        res.status(404).send(`
          <h1>Wall of Art Page Not Found</h1>
          <p>Make sure wallofart.html exists in the public folder</p>
          <p>Expected path: ${wallOfArtPath}</p>
        `);
      }
    });
  });

  // Serve hallofgrinched.html
  app.get("/hallofgrinched", (req, res) => {
    const hallOfGrinchedPath = path.join(process.cwd(), "public", "hallofgrinched.html");
    res.sendFile(hallOfGrinchedPath, (err) => {
      if (err) {
        console.error("Error serving hallofgrinched.html:", err);
        res.status(404).send(`
          <h1>Hall of Grinched Page Not Found</h1>
          <p>Make sure hallofgrinched.html exists in the public folder</p>
          <p>Expected path: ${hallOfGrinchedPath}</p>
        `);
      }
    });
  });

  // Serve contest.html
  app.get("/contest", (req, res) => {
    const contestPath = path.join(process.cwd(), "public", "contest.html");
    res.sendFile(contestPath, (err) => {
      if (err) {
        console.error("Error serving contest.html:", err);
        res.status(404).send(`
          <h1>Contest Page Not Found</h1>
          <p>Make sure contest.html exists in the public folder</p>
          <p>Expected path: ${contestPath}</p>
        `);
      }
    });
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Lazy initialized GoogleGenAI client
  let aiClient: GoogleGenAI | null = null;
  function getAiClient(): GoogleGenAI {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY environment variable is not set");
      }
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Pepe Grinch Trade Roast Endpoint
  app.post("/api/grinch-roast", async (req, res) => {
    try {
      const { fumble } = req.body;
      if (!fumble || typeof fumble !== "string" || fumble.trim() === "") {
        return res.status(400).json({ error: "Give me something to roast, paperhands!" });
      }

      try {
        const ai = getAiClient();
        const prompt = `Analyze this trade or crypto regret: "${fumble}". Deliver a hilarious, punchy, cynical, and highly custom burn.`;
        
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash-exp",
          contents: prompt,
          config: {
            systemInstruction: 
              "You are Pepe Grinch ($GRINCH), the mascot of regret on TON chain. You are standard green frog with a Santa hat and a devious grin. You hate jeets (early sellers), paperhands, FOMOers, and copycats. You roast players in hilarious Web3 slangs (jeeting, fading, blue-chip, mooning, candles, rug, devs). Speak directly, use exactly 1 to 3 sentences max. Be extremely sarcastic, sharp, and brutally funny."
          }
        });

        const roast = response.text || "You got Grinched so hard I lost my words.";
        return res.json({ roast, success: true });
      } catch (aiError: any) {
        console.warn("AI Roast error or missing Gemini key. Generating dynamic backup roast.", aiError?.message);
        
        const backupRoasts = [
          "Bro really decided to jeet for a McDonald's meal right before a 50x candle. Pepe Grinch is laughing all the way to the TON pool! 🟩🎄",
          "You faded the Telegram sticker king and now you're watching green candles from the sidelines. Enjoy gettin' Grinched! 🐸🎅",
          "Your paperhands are so weak they could be used to wipe the sweat off Egor Zhgun's forehead. Absolutely pathetic. 📉🩸",
          "Bought the local top, sold the absolute bottom, and now you want sympathy? The only thing you're getting is Grinched! 💩✨",
          "You let the seasonal fear get to you, forgetting that regret trades 12 months a year. Play stupid games, get Grinched! 🎄💚"
        ];
        
        const randomRoast = backupRoasts[Math.floor(Math.random() * backupRoasts.length)];
        return res.json({
          roast: randomRoast,
          success: false,
          isDemo: true,
          note: "Unlock the full power of real-time server-side Gemini AI by configuring GEMINI_API_KEY in the Secrets panel."
        });
      }
    } catch (err: any) {
      console.error("Roast handler error:", err);
      return res.status(500).json({ error: "Something crashed in the Grinch's cave." });
    }
  });

  // ====== VITE MIDDLEWARE ======
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        watch: {
          // During development, ignore certain files
          ignored: ['**/node_modules/**', '**/dist/**']
        }
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built files
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files from dist
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        // Set correct MIME types for JavaScript files
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.mjs')) {
          res.setHeader('Content-Type', 'application/javascript');
        } else if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css');
        }
      }
    }));
    
    // Handle all other routes - serve index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Pepe Grinch Server] Listening on http://localhost:${PORT}`);
    console.log(`[Pepe Grinch Server] React app: http://localhost:${PORT}`);
    console.log(`[Pepe Grinch Server] Contest page: http://localhost:${PORT}/contest`);
    console.log(`[Pepe Grinch Server] Hall of Grinched: http://localhost:${PORT}/hallofgrinched`);
    console.log(`[Pepe Grinch Server] Wall of Art: http://localhost:${PORT}/wallofart`);
  });
}

startServer();