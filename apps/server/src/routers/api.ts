import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const api = new Hono();

api.get(
  "/hello",
  zValidator("query", z.object({ name: z.string() })),
  async (c) => {
    const { name } = c.req.valid("query");
    return c.json({ message: `Hello ${name}!` }, 200);
  }
);

api
  .get("/endpoint", (c) => {
    return c.json({ message: "GET /endpoint" }, 200);
  })
  .post((c) => {
    return c.json({ message: "POST /endpoint" }, 201);
  })
  .delete((c) => {
    return c.body(null, 204);
  });

export { api };