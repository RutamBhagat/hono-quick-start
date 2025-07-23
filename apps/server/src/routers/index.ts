import { posts } from "./posts";
import { admin } from "./admin";

export const appRouter = {
  posts,
  admin,
};

export type AppRouter = typeof appRouter;
