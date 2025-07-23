import { posts } from "@/routers/posts";
import { admin } from "@/routers/admin";
import { api } from "@/routers/api";

export const appRouter = {
  posts,
  admin,
  api,
};

export type AppRouter = typeof appRouter;
