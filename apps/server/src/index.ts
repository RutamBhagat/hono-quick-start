import { env } from "cloudflare:workers";
import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { responseTimer } from "@/middleware";
import { appRouter } from "@/routers";
import type { AppEnv } from "@/types";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@/lib/context";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { stream } from "hono/streaming";

const app = new Hono<AppEnv>();

app.use(logger());
app.use(responseTimer);
app.use("/*", cors({
  origin: env.CORS_ORIGIN || "",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => {
      return createContext({ context });
    },
  })
);

app.post("/ai", async (c) => {
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

app.get("/", (c) => {
  return c.json({ healthy: true });
});

export default app;
