import { describe, it, expect } from "vitest";
import { createCaller, testData } from "@/__tests__/helpers/test-utils";

describe("Posts tRPC routes", () => {
  it("Should get post with id and page", async () => {
    const caller = createCaller();
    const result = await caller.posts.getById({ 
      id: testData.samplePostId, 
      page: testData.samplePage 
    });
    expect(result).toEqual({
      message: `You want to see page: ${testData.samplePage} of post: ${testData.samplePostId}`,
      headers: { "X-Message": "Hi!" }
    });
  });

  it("Should throw error without page parameter", async () => {
    const caller = createCaller();
    await expect(caller.posts.getById({ id: testData.samplePostId } as any)).rejects.toThrow();
  });

  it("Should create new post", async () => {
    const caller = createCaller();
    const result = await caller.posts.create();
    expect(result).toEqual({
      message: "Post created successfully.",
    });
  });

  it("Should delete post with id", async () => {
    const caller = createCaller();
    const result = await caller.posts.delete({ id: "456" });
    expect(result).toEqual({ success: true, deletedId: "456" });
  });
});