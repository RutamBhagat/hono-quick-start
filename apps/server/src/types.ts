import { Context, Next } from "hono";

export type Bindings = {
  CORS_ORIGIN: string;
  DATABASE_URL?: string;
  JWT_SECRET?: string;
};

export type Variables = {
  user?: {
    id: string;
    name: string;
    email?: string;
    role?: string;
  };
};

export type AppEnv = { Bindings: Bindings; Variables: Variables };
export type AppContext = Context<AppEnv>;
export type { Next };