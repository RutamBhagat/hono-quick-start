import { posts } from "./posts";
import { admin } from "./admin";
import { api } from "./api";

export const appRouter = {
  posts,
  admin,
  api,
};

export type AppRouter = typeof appRouter;
