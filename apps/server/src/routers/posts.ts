import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const posts = new Hono();

posts.post("/", (c) => {
  return c.json(
    {
      message: "Post created successfully.",
    },
    201
  );
});

posts.get(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  zValidator("query", z.object({ page: z.string() })),
  (c) => {
    const { page } = c.req.valid("query");
    const { id } = c.req.valid("param");
    c.header("X-Message", "Hi!");
    return c.json(
      {
        message: `You want to see page: ${page} of post: ${id}`,
      },
      200
    );
  }
);

posts.delete(
  "/:id",
  zValidator("param", z.object({ id: z.string() })),
  (c) => {
    const { id } = c.req.valid("param");
    return c.body(null, 204);
  }
);

export { posts };