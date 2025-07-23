import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

const errorResponse = new Response("Unauthorized", {
  status: 401,
  headers: {
    Authenticate: 'error="invalid_token"',
  },
});

export const setUserContext = async (c: Context, next: Next) => {
  const userId = c.req.header("X-User-ID");
  const userName = c.req.header("X-User-Name");

  if (!userId || !userName) {
    throw new HTTPException(400, { res: errorResponse });
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

  if (username === c.env.USERNAME && password === c.env.PASSWORD) {
    await next();
  } else {
    return c.json({ error: "Unauthorized" }, 401);
  }
};