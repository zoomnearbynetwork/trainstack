# TrainStack – AI‑powered SaaS

This repository contains **TrainStack**, a full‑stack SaaS platform for training institutes.  It includes a NestJS API, a Next.js web frontend, shared UI and type packages, and infrastructure for Docker and Nginx.  The application can be deployed to a Hostinger KVM 2 VPS, and an AI chatbot (acting as a virtual admin) is intended to run the deployment script and manage the stack on your server.

## Key features

* **NestJS API** – secure REST API with role‑based access control, tenant middleware, job queues and a WhatsApp webhook module.
* **Next.js web app** – modern React frontend using React Query for data fetching.
* **Prisma + PostgreSQL** – type‑safe ORM with a PostgreSQL database.
* **Redis + BullMQ** – support for queues and workers.
* **RBAC & Tenancy** – decorators and guards for role‑based access and multi‑tenant support.
* **Campaign jobs and WhatsApp modules** – built‑in modules for marketing campaigns and WhatsApp webhook verification/handling.
* **Docker & Nginx** – containerised services with an Nginx reverse proxy.

## Deployment on Hostinger KVM 2

These steps assume you are using a Hostinger KVM 2 VPS with Docker and Docker Compose installed.  The AI chatbot (or you) can run these commands to deploy TrainStack.

1. **Clone the repository** to your server:

   ```bash
   git clone https://<your-git-provider>/<your-user>/trainstack.git
   cd trainstack
   ```

2. **Configure environment variables** by copying the example file and editing values as needed:

   ```bash
   cp .env.example .env
   # Edit `.env` to set JWT secrets, AI provider keys, etc.
   ```

3. **Deploy the application** using the provided helper script.  This script starts the Docker containers, runs database migrations and seeds initial data:

   ```bash
   ./deploy.sh
   ```

   The first run may take several minutes while dependencies are installed and TypeScript is compiled.

4. **Access the application** after the services are running:

   * API: `http://<server‑ip>:4000/api/v1`
   * Web UI: `http://<server‑ip>:3000`
   * Nginx proxy: `http://<server‑ip>:8080`

5. **Default login**.  The seed script sets up a demo tenant and admin account.  Log in with:

   * **Email:** `admin@demo.com`
   * **Password:** `Password123!`

   Change these credentials before going live.

### Additional scripts

During development you can run individual commands directly:

* `npm run dev` – run API and web locally (requires local PostgreSQL and Redis).
* `npm run prisma:generate` – generate Prisma client types.
* `npm run prisma:migrate` – apply database migrations.
* `npm run prisma:seed` – seed the database with demo data.

The provided `deploy.sh` script is recommended for production, encapsulating all tasks in one command.