import { Hono } from "hono";

const admin = new Hono();

admin.get("/", (c) => {
  return c.json({ message: "Welcome to the admin panel!" });
});

export { admin };