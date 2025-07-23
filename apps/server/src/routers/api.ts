import { z } from "zod";
import { publicProcedure, router } from "@/lib/trpc";

export const apiRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      return { message: `Hello ${input.name}!` };
    }),

  endpoint: router({
    get: publicProcedure.query(() => {
      return { message: "GET /endpoint" };
    }),

    create: publicProcedure.mutation(() => {
      return { message: "POST /endpoint" };
    }),

    delete: publicProcedure.mutation(() => {
      return { success: true };
    }),
  }),
});