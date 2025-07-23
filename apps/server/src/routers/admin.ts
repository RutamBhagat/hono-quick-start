import { Hono } from "hono";
import { setUserContext, createAdminAuth } from "@/middleware";
import type { AppEnv } from "@/types";

const admin = new Hono<AppEnv>();

admin.use("*", createAdminAuth, setUserContext);

admin.get("/", (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ message: "Welcome to the admin panel! (User not set)" });
  }
  const message = `Welcome ${user.name} with ID: ${user.id}`;
  return c.json({ message: message });
});

export { admin };