import { describe, it, expect } from "vitest";
import { app, mockEnv, createAuthHeaders, testData } from "@/__tests__/helpers/test-utils";

describe("Admin routes", () => {
  it("Should require authentication", async () => {
    const res = await app.request("/admin", {}, mockEnv);
    expect(res.status).toBe(401);
  });

  it("Should allow access with valid credentials", async () => {
    const res = await app.request(
      "/admin",
      {
        headers: createAuthHeaders(testData.validCredentials, {
          "X-User-ID": testData.sampleUserId,
          "X-User-Name": testData.sampleUserName,
        }),
      },
      mockEnv
    );
    expect(res.status).toBe(200);
    const data = await res.json() as { message: string };
    expect(data).toEqual({
      message: `Welcome ${testData.sampleUserName} with ID: ${testData.sampleUserId}`,
    });
  });

  it("Should reject invalid credentials", async () => {
    const res = await app.request(
      "/admin",
      {
        headers: createAuthHeaders(testData.invalidCredentials),
      },
      mockEnv
    );
    expect(res.status).toBe(401);
  });
});