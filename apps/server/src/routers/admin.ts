import { protectedProcedure, router } from "@/lib/trpc";

export const adminRouter = router({
  welcome: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;
    if (!user) {
      return { message: "Welcome to the admin panel! (User not set)" };
    }
    const message = `Welcome ${user.name} with ID: ${user.id}`;
    return { message };
  }),
});