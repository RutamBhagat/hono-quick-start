import { Hono } from "hono";
import { setUserContext, createAdminAuth } from "../middleware";

const admin = new Hono();

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