# TrainStack AI Monorepo Starter v2

More complete starter for an IT training institute SaaS with:
- NestJS API
- Next.js web app
- Prisma + PostgreSQL
- Redis + BullMQ
- RBAC
- Tenant middleware
- Campaign jobs
- WhatsApp webhook module
- React Query wiring
- Docker + Nginx

## Quick start

```bash
cp .env.example .env
docker compose up -d postgres redis
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Seeded login
- admin@demo.com
- Password123!

## Main starter additions in v2
- header-based tenant resolution via `x-tenant-slug`
- `@Roles()` decorator + `RolesGuard`
- campaign queue + BullMQ processor
- WhatsApp webhook verify/inbound module
- React Query provider and client hooks
