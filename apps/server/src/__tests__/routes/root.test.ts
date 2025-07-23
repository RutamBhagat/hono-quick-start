import { describe, it, expect } from "vitest";
import { app } from "@/__tests__/helpers/test-utils";

describe("Root route", () => {
  it("Should return 200 response", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
  });

  it("Should return correct message", async () => {
    const res = await app.request("/");
    const data = await res.json() as { healthy: boolean };
    expect(data).toEqual({ healthy: true });
  });

  it("Should include response time header", async () => {
    const res = await app.request("/");
    expect(res.headers.get("X-Response-Time")).toBeDefined();
  });
});