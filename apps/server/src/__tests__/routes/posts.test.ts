import { describe, it, expect } from "vitest";
import { app, testData, createJSONRequest } from "../helpers/test-utils";

describe("Posts routes", () => {
  it("Should get post with id and page", async () => {
    const res = await app.request(`/posts/${testData.samplePostId}?page=${testData.samplePage}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("X-Message")).toBe("Hi!");
    const data = await res.json() as { message: string };
    expect(data).toEqual({
      message: `You want to see page: ${testData.samplePage} of post: ${testData.samplePostId}`,
    });
  });

  it("Should return 400 without page query", async () => {
    const res = await app.request(`/posts/${testData.samplePostId}`);
    expect(res.status).toBe(400);
  });

  it("Should create new post with empty body", async () => {
    const res = await app.request("/posts", {
      method: "POST",
    });
    expect(res.status).toBe(201);
    const data = await res.json() as { message: string };
    expect(data).toEqual({
      message: "Post created successfully.",
    });
  });

  it("Should create new post with JSON data", async () => {
    const res = await app.request("/posts", createJSONRequest(testData.sampleJSON));
    expect(res.status).toBe(201);
    const data = await res.json() as { message: string };
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