import { env } from "cloudflare:workers";
import { auth } from "./lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { posts } from "./routers/posts";
import { admin } from "./routers/admin";
import { api } from "./routers/api";
import { responseTimer, createAdminAuth, setUserContext } from "./middleware";

const app = new Hono();

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

app.route('/posts', posts);
app.route('/admin', admin);
app.route('/api/v1', api);

export default app;
