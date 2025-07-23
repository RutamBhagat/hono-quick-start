import { describe, it, expect } from "vitest";
import app from "./index";

describe("Root route", () => {
  it("Should return 200 response", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
  });

  it("Should return correct message", async () => {
    const res = await app.request("/");
    const data = await res.json();
    expect(data).toEqual({ healthy: true });
  });

  it("Should include response time header", async () => {
    const res = await app.request("/");
    expect(res.headers.get("X-Response-Time")).toBeDefined();
  });
});

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

describe("Admin routes", () => {
  const mockEnv = { USERNAME: "admin", PASSWORD: "secret" };

  it("Should require authentication", async () => {
    const res = await app.request("/admin", {}, mockEnv);
    expect(res.status).toBe(401);
  });

  it("Should allow access with valid credentials", async () => {
    const credentials = btoa("admin:secret");
    const res = await app.request(
      "/admin",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "X-User-ID": "test-user-123",
          "X-User-Name": "TestUser",
        },
      },
      mockEnv
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({
      message: "Welcome TestUser with ID: test-user-123",
    });
  });

  it("Should reject invalid credentials", async () => {
    const credentials = btoa("admin:wrong");
    const res = await app.request(
      "/admin",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      },
      mockEnv
    );
    expect(res.status).toBe(401);
  });
});

describe("API v1 hello route", () => {
  it("Should return 200 with valid name query", async () => {
    const res = await app.request("/api/v1/hello?name=World");
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ message: "Hello World!" });
  });

  it("Should return 400 without name query", async () => {
    const res = await app.request("/api/v1/hello");
    expect(res.status).toBe(400);
  });
});