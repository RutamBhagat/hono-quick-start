/**
 * Shared test utilities for Hono application testing
 */

import app from "../../index";
import type { Bindings } from "../../types";

/**
 * Mock environment that matches the Bindings type for comprehensive testing
 */
export const mockEnv: Bindings = {
  CORS_ORIGIN: "http://localhost:3000",
  DATABASE_URL: "file:./test.db",
  JWT_SECRET: "test-jwt-secret-key",
  USERNAME: "admin",
  PASSWORD: "secret",
};

/**
 * Minimal mock environment for basic admin testing
 */
export const mockAdminEnv = { 
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
 * Helper to create JSON request body
 * @param data - Object to convert to JSON
 * @returns Request init with JSON body and headers
 */
export const createJSONRequest = (data: Record<string, unknown>) => ({
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Helper to create FormData request body
 * @param data - Object to convert to FormData
 * @returns Request init with FormData body
 */
export const createFormDataRequest = (data: Record<string, string | File>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return {
    method: "POST",  
    body: formData,
  };
};

/**
 * Mock D1 database for testing
 */
export const mockD1 = {
  prepare: (_query: string) => ({
    bind: (..._params: unknown[]) => ({
      first: () => Promise.resolve(null),
      all: () => Promise.resolve({ results: [], success: true }),
      run: () => Promise.resolve({ success: true, meta: { changes: 1 } }),
    }),
  }),
};

/**
 * Enhanced mock environment with database bindings
 */
export const mockEnvWithDB: Bindings & { DB: typeof mockD1 } = {
  ...mockEnv,
  DB: mockD1,
};

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
  sampleJSON: { message: "hello hono", type: "test" },
  sampleFormData: { message: "hello", file: "test.txt" },
};