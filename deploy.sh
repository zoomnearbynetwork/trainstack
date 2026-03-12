#!/usr/bin/env bash
# Deployment helper for TrainStack on Hostinger KVM 2 VPS.
# This script starts the Docker services, applies database migrations,
# and seeds initial data.  It is designed to be executed by an AI chatbot
# or manually by an administrator.

set -euo pipefail

echo "Starting Docker containers for TrainStack..."
docker compose up -d
echo "Waiting for containers to become healthy..."
docker compose ps
sleep 10

echo "Applying database migrations..."
docker compose exec -T api npm run prisma:migrate

echo "Seeding database with demo data..."
docker compose exec -T api npm run prisma:seed

echo "Deployment complete. Access the web UI via your domain or VPS IP."