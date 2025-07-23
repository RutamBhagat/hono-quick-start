import { posts } from "@/routers/posts";
import { admin } from "@/routers/admin";
import { api } from "@/routers/api";
import { ai } from "@/routers/ai";

export const appRouter = {
  posts,
  admin,
  api,
  ai
};

export type AppRouter = typeof appRouter;
