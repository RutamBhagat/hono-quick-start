 │  Next steps                                                                           │
 │  1. cd hono-better                                                                    │
 │  IMPORTANT: Complete D1 database setup first (see Database commands below)            │
 │  2. pnpm dev                                                                          │
 │  3. cd apps/server && pnpm run cf-typegen                                             │
 │                                                                                       │
 │  Your project will be available at:                                                   │
 │  • Frontend: http://localhost:3001                                                    │
 │  • Backend API: http://localhost:3000                                                 │
 │                                                                                       │
 │  Database commands:                                                                   │
 │  1. Login to Cloudflare: pnpm wrangler login                                          │
 │  2. Create D1 database: pnpm wrangler d1 create your-database-name                    │
 │  3. Update apps/server/wrangler.jsonc with database_id and database_name              │
 │  4. Generate migrations: cd apps/server && bun db:generate                            │
 │  5. Apply migrations locally: pnpm wrangler d1 migrations apply YOUR_DB_NAME --local  │
 │  6. Apply migrations to production: pnpm wrangler d1 migrations apply YOUR_DB_NAME    │
 │                                                                                       │
 │  • Apply schema: pnpm db:push                                                         │
 │  • Database UI: pnpm db:studio                                                        │
 │                                                                                       │
 │  Linting and formatting:                                                              │
 │  • Format and lint fix: pnpm check                                                    │
 │                                                                                       │
 │  Deploy frontend to Cloudflare Workers:                                               │
 │  • Deploy: cd apps/web && pnpm deploy                                                 │
 │                                                                                       │
 │  Update all dependencies:                                                             │
 │  pnpm dlx taze -r                                                                     │
 │                                                                                       │
 │  Like Better-T Stack? Please consider giving us a star on GitHub:                     │
 │  https://github.com/AmanVarshney01/create-better-t-stack                              