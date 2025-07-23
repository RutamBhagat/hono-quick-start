import { describe, it, expect } from "vitest";
import { app } from "@/__tests__/helpers/test-utils";

describe("API v1 hello route", () => {
  it("Should return 200 with valid name query", async () => {
    const res = await app.request("/api/v1/hello?name=World");
    expect(res.status).toBe(200);
    const data = await res.json() as { message: string };
    expect(data).toEqual({ message: "Hello World!" });
  });

  it("Should return 400 without name query", async () => {
    const res = await app.request("/api/v1/hello");
    expect(res.status).toBe(400);
  });
});