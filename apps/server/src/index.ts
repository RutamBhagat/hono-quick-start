import { env } from "cloudflare:workers";
import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { responseTimer, createAdminAuth, setUserContext } from "@/middleware";
import { appRouter } from "@/routers";
import type { AppEnv } from "@/types";

const app = new Hono<AppEnv>();

app.use(logger());
app.use("/*", cors({
  origin: env.CORS_ORIGIN || "",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(responseTimer);
app.use("/admin/*", createAdminAuth, setUserContext);

app.get("/", (c) => {
  return c.json({ healthy: true });
});

app.route("/posts", appRouter.posts);
app.route('/admin', appRouter.admin);
app.route('/api/v1', appRouter.api);

export default app;
