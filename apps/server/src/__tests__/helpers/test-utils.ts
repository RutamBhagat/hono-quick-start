/**
 * Shared test utilities for Hono application testing
 */

import app from "../../index";

/**
 * Mock environment for testing admin routes
 */
export const mockEnv = { 
  USERNAME: "admin", 
  PASSWORD: "secret" 
};

/**
 * Creates Basic Authentication header value
 * @param username - Username for authentication
 * @param password - Password for authentication
 * @returns Base64 encoded credentials
 */
export const createBasicAuth = (username: string, password: string): string => {
  return btoa(`${username}:${password}`);
};

/**
 * Helper to create authenticated request headers
 * @param credentials - Base64 encoded credentials
 * @param additionalHeaders - Additional headers to include
 * @returns Headers object for authenticated requests
 */
export const createAuthHeaders = (
  credentials: string,
  additionalHeaders: Record<string, string> = {}
): Record<string, string> => {
  return {
    Authorization: `Basic ${credentials}`,
    ...additionalHeaders,
  };
};

/**
 * Test app instance for consistent testing
 */
export { app };

/**
 * Common test data and mock values
 */
export const testData = {
  validCredentials: createBasicAuth("admin", "secret"),
  invalidCredentials: createBasicAuth("admin", "wrong"),
  sampleUserId: "test-user-123",
  sampleUserName: "TestUser",
  samplePostId: "123",
  samplePage: "1",
};