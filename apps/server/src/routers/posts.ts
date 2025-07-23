import { z } from "zod";
import { publicProcedure, router } from "@/lib/trpc";

export const postsRouter = router({
  create: publicProcedure.mutation(() => {
    return { message: "Post created successfully." };
  }),

  getById: publicProcedure
    .input(z.object({ 
      id: z.string(),
      page: z.string()
    }))
    .query(({ input }) => {
      const { page, id } = input;
      return {
        message: `You want to see page: ${page} of post: ${id}`,
        headers: { "X-Message": "Hi!" }
      };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const { id } = input;
      return { success: true, deletedId: id };
    }),
});