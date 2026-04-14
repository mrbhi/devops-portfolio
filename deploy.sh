#!/bin/bash

set -e

cd /var/www/devops-portfolio

echo "🚀 Starting Blue-Green Deployment..."

# Always sync with GitHub (prevents merge issues)
echo "Syncing with repository..."
git fetch origin main
git reset --hard origin/main

# Decide active environment
if docker ps | grep app-blue > /dev/null; then

  echo "🟢 BLUE is live → Deploy GREEN"

  docker compose -f docker-compose.app.yml up -d --build app-green

  echo "Health check GREEN..."
  curl -f http://localhost:3002 || exit 1

  echo "Switching traffic to GREEN..."
  sudo sed -i 's/3001/3002/g' /etc/nginx/sites-enabled/devops
  sudo systemctl reload nginx

  echo "Stopping BLUE..."
  docker stop app-blue || true

else

  echo "🔵 GREEN is live → Deploy BLUE"

  docker compose -f docker-compose.app.yml up -d --build app-blue

  echo "Health check BLUE..."
  curl -f http://localhost:3001 || exit 1

  echo "Switching traffic to BLUE..."
  sudo sed -i 's/3002/3001/g' /etc/nginx/sites-enabled/devops
  sudo systemctl reload nginx

  echo "Stopping GREEN..."
  docker stop app-green || true

fi

echo "✅ Deployment complete"