import { describe, it, expect } from "vitest";
import { createCaller } from "@/__tests__/helpers/test-utils";

describe("API tRPC hello route", () => {
  it("Should return message with valid name input", async () => {
    const caller = createCaller();
    const result = await caller.api.hello({ name: "World" });
    expect(result).toEqual({ message: "Hello World!" });
  });

  it("Should throw error without name input", async () => {
    const caller = createCaller();
    await expect(caller.api.hello({} as any)).rejects.toThrow();
  });
});