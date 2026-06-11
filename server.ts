import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

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
          model: "gemini-3.5-flash",
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

  // Vite middleware setup or production static file serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Pepe Grinch Server] Listening on http://localhost:${PORT}`);
  });
}

startServer();
