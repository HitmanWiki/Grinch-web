// server.js - Modified version
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
    // ... (your existing roast handler code)
  });

  // ====== CONTEST ROUTE - ADD THIS ======
  // Serve contest.html at /contest
  app.get("/contest", (req, res) => {
    // Check if contest.html exists in public folder
    const contestPath = path.join(process.cwd(), "public", "contest.html");
    res.sendFile(contestPath, (err) => {
      if (err) {
        console.error("Error serving contest.html:", err);
        res.status(404).send("Contest page not found");
      }
    });
  });

  // ====== VITE MIDDLEWARE ======
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // This catch-all should come AFTER static routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Pepe Grinch Server] Listening on http://localhost:${PORT}`);
  });
}

startServer();