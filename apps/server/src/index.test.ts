import { describe, it, expect } from "vitest";
import app from "./index";

describe("Posts routes", () => {
  it("Should get post with id and page", async () => {
    const res = await app.request("/posts/123?page=1");
    expect(res.status).toBe(200);
    expect(res.headers.get("X-Message")).toBe("Hi!");
    const data = await res.json();
    expect(data).toEqual({
      message: "You want to see page: 1 of post: 123",
    });
  });

  it("Should return 400 without page query", async () => {
    const res = await app.request("/posts/123");
    expect(res.status).toBe(400);
  });

  it("Should create new post", async () => {
    const res = await app.request("/posts", {
      method: "POST",
    });
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data).toEqual({
      message: "Post created successfully.",
    });
  });

  it("Should delete post with id", async () => {
    const res = await app.request("/posts/456", {
      method: "DELETE",
    });
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
  });
});