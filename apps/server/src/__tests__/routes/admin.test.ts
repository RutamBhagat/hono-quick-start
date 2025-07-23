import { describe, it, expect } from "vitest";
import { createCaller, createAuthenticatedCaller, testData } from "@/__tests__/helpers/test-utils";
import { TRPCError } from "@trpc/server";

describe("Admin tRPC routes", () => {
  it("Should require authentication", async () => {
    const caller = createCaller();
    await expect(() => caller.admin.welcome()).rejects.toThrow(TRPCError);
  });

  it("Should allow access with valid session", async () => {
    const caller = createAuthenticatedCaller({
      id: testData.sampleUserId,
      name: testData.sampleUserName
    });
    
    const result = await caller.admin.welcome();
    expect(result).toEqual({
      message: `Welcome ${testData.sampleUserName} with ID: ${testData.sampleUserId}`,
    });
  });
});