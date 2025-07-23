# Hono Testing Best Practices

This directory demonstrates testing best practices for Hono applications with Cloudflare Workers using Vitest.

## Configuration

### Vitest Setup
- Uses `@cloudflare/vitest-pool-workers` for proper Cloudflare Workers environment
- Configured in `vitest.config.ts` with miniflare compatibility

### Test Structure
```
src/__tests__/
├── helpers/
│   └── test-utils.ts          # Shared utilities and mocks
├── routes/
│   ├── admin.test.ts          # Admin route tests
│   ├── api.test.ts            # API route tests
│   ├── posts.test.ts          # Posts route tests
│   └── root.test.ts           # Root route tests
├── examples/
│   └── best-practices.test.ts # Comprehensive examples
└── README.md                  # This file
```

## Best Practices Implemented

### 1. Centralized Test Utilities (`test-utils.ts`)

**Type-Safe Environment Mocking:**
```typescript
export const mockEnv: Bindings = {
  CORS_ORIGIN: "http://localhost:3000",
  DATABASE_URL: "file:./test.db", 
  JWT_SECRET: "test-jwt-secret-key",
  USERNAME: "admin",
  PASSWORD: "secret",
};
```

**Request Helpers:**
```typescript
// JSON requests
export const createJSONRequest = (data: Record<string, unknown>) => ({
  method: "POST",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" },
});

// FormData requests  
export const createFormDataRequest = (data: Record<string, string | File>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return { method: "POST", body: formData };
};
```

**Authentication Helpers:**
```typescript
export const createBasicAuth = (username: string, password: string): string => {
  return btoa(`${username}:${password}`);
};

export const createAuthHeaders = (
  credentials: string,
  additionalHeaders: Record<string, string> = {}
): Record<string, string> => {
  return {
    Authorization: `Basic ${credentials}`,
    ...additionalHeaders,
  };
};
```

### 2. Testing Patterns

**Basic GET Requests:**
```typescript
it("Should test simple GET endpoint", async () => {
  const res = await app.request("/");
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ healthy: true });
});
```

**POST with JSON Body:**
```typescript
it("Should handle JSON POST requests", async () => {
  const res = await app.request("/posts", createJSONRequest({
    message: "hello hono", 
    type: "test"
  }));
  expect(res.status).toBe(201);
});
```

**Environment Variable Testing:**
```typescript
it("Should use typed mock environment", async () => {
  const res = await app.request("/admin", {
    headers: createAuthHeaders(validCredentials),
  }, mockEnv);
  expect(res.status).toBe(200);
});
```

**Authentication Testing:**
```typescript
it("Should test protected routes with valid auth", async () => {
  const res = await app.request("/admin", {
    headers: createAuthHeaders(validCredentials, {
      "X-User-ID": "test-user-123",
      "X-User-Name": "TestUser",
    }),
  }, mockEnv);
  expect(res.status).toBe(200);
});
```

### 3. Advanced Patterns

**Using Request Objects:**
```typescript
it("Should handle raw Request objects", async () => {
  const req = new Request("http://localhost/posts", {
    method: "POST",
    body: JSON.stringify({ title: "Test Post" }),
    headers: { "Content-Type": "application/json" },
  });
  const res = await app.request(req);
  expect(res.status).toBe(201);
});
```

**Database Mocking:**
```typescript
export const mockD1 = {
  prepare: (query: string) => ({
    bind: (...params: unknown[]) => ({
      first: () => Promise.resolve(null),
      all: () => Promise.resolve({ results: [], success: true }),
      run: () => Promise.resolve({ success: true, meta: { changes: 1 } }),
    }),
  }),
};
```

**Testing Headers and Middleware:**
```typescript
it("Should test custom headers", async () => {
  const res = await app.request("/posts/123?page=1");
  expect(res.headers.get("X-Message")).toBe("Hi!");
});

it("Should test CORS headers", async () => {
  const res = await app.request("/", { method: "OPTIONS" });
  expect(res.headers.get("Access-Control-Allow-Origin")).toBeDefined();
});
```

## Key Benefits

1. **Type Safety**: All mock environments match your actual `Bindings` type
2. **Reusability**: Centralized utilities prevent code duplication
3. **Maintainability**: Clear separation of concerns and consistent patterns
4. **End-to-End Testing**: Tests run in actual Cloudflare Workers environment
5. **Real HTTP Requests**: Uses actual Request/Response objects like production

## Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test src/__tests__/routes/posts.test.ts

# Run tests in watch mode
pnpm test --watch
```

## Common Patterns Summary

- ✅ Use `app.request()` for all HTTP testing
- ✅ Pass environment as 3rd parameter for bindings
- ✅ Use helper functions for common request types
- ✅ Test both success and error cases
- ✅ Verify response status, headers, and body
- ✅ Mock external dependencies (DB, APIs)
- ✅ Use type-safe environment mocking
- ✅ Test middleware behavior and custom headers
- ✅ Follow Arrange-Act-Assert pattern consistently

This setup provides a robust foundation for testing Hono applications following official recommendations and industry best practices.