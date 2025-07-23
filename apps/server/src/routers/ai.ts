import type { AppEnv } from "@/types";
import { Hono } from "hono";
import { env } from "cloudflare:workers";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { stream } from "hono/streaming";

const ai = new Hono<AppEnv>();

ai.post("/", async (c) => {
  const body = await c.req.json();
  const messages = body.messages || [];
  const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
  });
  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages,
  });

  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");
  return stream(c, (stream) => stream.pipe(result.toDataStream()));
});

export { ai };
