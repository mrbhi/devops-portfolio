#!/bin/bash
set -e

cd /var/www/devops-portfolio

echo "🚀 Starting Blue-Green Deployment..."

# Login to GHCR
echo $GHCR_TOKEN | docker login ghcr.io -u $GHCR_USER --password-stdin

# Pull latest image
docker pull ghcr.io/mrbhi/devops-portfolio:latest

if docker ps | grep app-blue > /dev/null; then
  echo "🟢 BLUE is live → Deploy GREEN"
  docker stop app-green || true
  docker rm app-green || true
  docker run -d --name app-green -p 3002:80 ghcr.io/mrbhi/devops-portfolio:latest

  echo "Health check GREEN..."
  sleep 5
  curl -f http://localhost:3002 || exit 1

  echo "Switching traffic to GREEN..."
  sudo sed -i 's/3001/3002/g' /etc/nginx/sites-enabled/devops
  sudo systemctl reload nginx

  echo "Stopping BLUE..."
  docker stop app-blue || true

else
  echo "🔵 GREEN is live → Deploy BLUE"
  docker stop app-blue || true
  docker rm app-blue || true
  docker run -d --name app-blue -p 3001:80 ghcr.io/mrbhi/devops-portfolio:latest

  echo "Health check BLUE..."
  sleep 5
  curl -f http://localhost:3001 || exit 1

  echo "Switching traffic to BLUE..."
  sudo sed -i 's/3002/3001/g' /etc/nginx/sites-enabled/devops
  sudo systemctl reload nginx

  echo "Stopping GREEN..."
  docker stop app-green || true
fi

echo "✅ Deployment complete"