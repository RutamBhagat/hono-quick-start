# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern full-stack TypeScript application built with the Better-T-Stack, featuring a Hono backend running on Cloudflare Workers and a Next.js 15 frontend with React 19. The project uses a monorepo structure with Turborepo for build orchestration.

## Tech Stack

**Frontend (apps/web)**
- Next.js 15 with App Router
- React 19 with Server Components
- TailwindCSS + shadcn/ui components
- TypeScript with strict configuration

**Backend (apps/server)**
- Hono framework on Cloudflare Workers
- Better Auth for authentication
- Drizzle ORM with SQLite/D1 database
- RPC-style API with type safety

**Development Tools**
- Turborepo for monorepo management
- Biome for linting and formatting
- Vitest for testing with Cloudflare Workers pool
- pnpm for package management

## Development Commands

**Initial Setup**
```bash
pnpm install
pnpm db:generate
pnpm db:migrate
```

**Development**
```bash
pnpm dev          # Start all apps (web on :3001, server on :3000)
pnpm dev:web      # Start only web app
pnpm dev:server   # Start only server
```

**Database Operations**
```bash
pnpm db:generate  # Generate migrations from schema changes
pnpm db:migrate   # Apply migrations to database
pnpm db:studio    # Open Drizzle Studio for DB management
```

**Testing & Code Quality**
```bash
pnpm test         # Run all tests
pnpm test:web     # Test web app only
pnpm test:server  # Test server only
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
```

**Build & Deploy**
```bash
pnpm build        # Build all apps for production
pnpm type-check   # Type check all packages
```

## Architecture

### Directory Structure
- `apps/web/` - Next.js frontend application
- `apps/server/` - Hono backend on Cloudflare Workers
- `packages/` - Shared utilities and configurations
- `packages/database/` - Drizzle schema and migrations
- `packages/auth/` - Better Auth configuration
- `packages/api/` - Shared API types and client

### Backend Architecture (Hono)

The server uses a middleware-first approach with the following chain:
1. **CORS** - Cross-origin request handling
2. **Rate Limiting** - Request throttling
3. **Logger** - Request/response logging
4. **Authentication** - Better Auth integration
5. **Context Enhancement** - Add user context to requests

**Key Middleware Files:**
- `apps/server/src/middleware/auth.ts` - Authentication logic
- `apps/server/src/middleware/cors.ts` - CORS configuration
- `apps/server/src/middleware/rate-limit.ts` - Rate limiting

**API Routes:**
- `/api/auth/*` - Authentication endpoints (Better Auth)
- `/api/users/*` - User management
- Routes follow RPC pattern for type safety

### Frontend Architecture (Next.js)

**App Router Structure:**
- `app/(auth)/` - Authentication pages (sign-in, sign-up)
- `app/(dashboard)/` - Protected dashboard pages
- `app/globals.css` - Global styles with CSS variables
- `components/ui/` - shadcn/ui components
- `lib/` - Utility functions and configurations

**Key Patterns:**
- Server Components by default for better performance
- Client Components marked with "use client"
- Centralized API client in `lib/api.ts`
- Theme system with CSS variables and dark/light modes

### Database Schema

Located in `packages/database/src/schema.ts`:
- **users** table with Better Auth integration
- Drizzle ORM with TypeScript-first approach
- Migrations stored in `packages/database/drizzle/`

## Environment Configuration

**Required Environment Variables:**
```bash
# Database
DATABASE_URL="file:./dev.db"  # Local development
# or DATABASE_URL for Cloudflare D1 in production

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"  # Adjust for production

# Cloudflare (for deployment)
CLOUDFLARE_API_TOKEN="your-api-token"
CLOUDFLARE_ACCOUNT_ID="your-account-id"
```

**Configuration Files:**
- `wrangler.toml` - Cloudflare Workers configuration
- `.dev.vars` - Local development environment variables
- `turbo.json` - Turborepo task configuration

## Common Development Patterns

### API Development
1. Define routes in `apps/server/src/routes/`
2. Use middleware chain for authentication and validation
3. Export types for frontend consumption
4. Follow RPC pattern for type-safe API calls

### Database Changes
1. Modify schema in `packages/database/src/schema.ts`
2. Run `pnpm db:generate` to create migration
3. Run `pnpm db:migrate` to apply changes
4. Update TypeScript types automatically via Drizzle

### Component Development
1. Use shadcn/ui components as base
2. Create custom components in `components/ui/`
3. Follow naming convention: kebab-case for files
4. Use TypeScript interfaces for props

### Testing
- Vitest configuration supports Cloudflare Workers environment
- Tests run with proper D1 database bindings
- Use `@cloudflare/vitest-pool-workers` for server testing

## Key Configuration Files

- `apps/server/wrangler.toml` - Cloudflare Workers deployment config
- `apps/web/next.config.mjs` - Next.js configuration with OpenNext
- `packages/database/drizzle.config.ts` - Database ORM configuration
- `biome.json` - Code formatting and linting rules
- `turbo.json` - Build system task definitions

## Authentication Flow

The app uses Better Auth with email/password authentication:
1. User registration/login handled by Better Auth
2. Session management via secure HTTP-only cookies
3. Middleware validates sessions on protected routes
4. Frontend components check auth state via API calls

## Deployment

**Cloudflare Deployment:**
- Backend deploys to Cloudflare Workers
- Frontend deploys to Cloudflare Pages with OpenNext adapter
- Database uses Cloudflare D1 (SQLite)
- Environment variables managed through Cloudflare dashboard

## Performance Considerations

- Server-side rendering enabled by default in Next.js
- Static generation where possible
- Cloudflare Workers provide edge performance
- Database queries optimized with Drizzle ORM
- Bundle optimization via Next.js and Turbopack

## Troubleshooting

**Common Issues:**
- If development servers fail to start, check port availability (3000, 3001)
- Database connection issues: verify `DATABASE_URL` and run migrations
- Build failures: ensure all environment variables are set
- Type errors: run `pnpm type-check` to identify issues

**Development Tips:**
- Use `pnpm db:studio` to inspect database changes
- Check `wrangler.toml` for Cloudflare Workers configuration
- Authentication issues often relate to `BETTER_AUTH_URL` configuration
- Hot reload works for both frontend and backend in development