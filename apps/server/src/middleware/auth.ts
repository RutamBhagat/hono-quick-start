import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import type { AppEnv } from "../types";

const createErrorResponse = () => new Response("Unauthorized", {
  status: 401,
  headers: {
    Authenticate: 'error="invalid_token"',
  },
});

export const setUserContext = createMiddleware<{
  Variables: {
    user: {
      id: string;
      name: string;
    };
  };
}>(async (c, next) => {
  const userId = c.req.header("X-User-ID");
  const userName = c.req.header("X-User-Name");

  if (!userId || !userName) {
    throw new HTTPException(401, { res: createErrorResponse() });
  }

  c.set("user", {
    id: userId,
    name: userName,
  });

  await next();
});

export const createAdminAuth = createMiddleware<AppEnv>(async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    throw new HTTPException(401, { res: createErrorResponse() });
  }

  const encodedCredentials = authHeader.split(" ")[1];
  const decodedCredentials = atob(encodedCredentials);
  const [username, password] = decodedCredentials.split(":");

  if (username !== c.env.USERNAME || password !== c.env.PASSWORD) {
    throw new HTTPException(401, { res: createErrorResponse() });
  }
  await next();
});
