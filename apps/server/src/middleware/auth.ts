import type { Context, Next } from "hono";

export const setUserContext = async (c: Context, next: Next) => {
  const userId = c.req.header("X-User-ID");
  const userName = c.req.header("X-User-Name");

  if (!userId || !userName) {
    return;
  }

  c.set("user", {
    id: userId,
    name: userName,
  });

  await next();
};

export const createAdminAuth = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const encodedCredentials = authHeader.split(" ")[1];
  const decodedCredentials = atob(encodedCredentials);
  const [username, password] = decodedCredentials.split(":");

  // Dummy authentication check
  if (username === "admin" && password === "secret") {
    await next();
  } else {
    return c.json({ error: "Unauthorized" }, 401);
  }
};