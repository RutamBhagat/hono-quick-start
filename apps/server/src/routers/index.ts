import { protectedProcedure, publicProcedure, router } from "@/lib/trpc";
import { todoRouter } from "@/routers/todo";
import { adminRouter } from "@/routers/admin";
import { apiRouter } from "@/routers/api";
import { postsRouter } from "@/routers/posts";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  todo: todoRouter,
  admin: adminRouter,
  api: apiRouter,
  posts: postsRouter,
});
export type AppRouter = typeof appRouter;
