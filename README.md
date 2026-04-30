# Taofeeq Bello — DevOps Portfolio

[![CI/CD Pipeline](https://github.com/mrbhi/devops-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/mrbhi/devops-portfolio/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live-taofeeq.btesz.com-brightgreen)](https://taofeeq.btesz.com)
[![Azure VM](https://img.shields.io/badge/Hosted-Azure%20VM-0078d4)](https://azure.microsoft.com)
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](https://github.com/mrbhi/devops-Portfolio/blob/main/LICENSE)

> A production-grade DevOps portfolio platform demonstrating real-world infrastructure engineering — not just a static website, but a fully automated, monitored, and secured deployment pipeline built from the ground up.

**Live:** [https://taofeeq.btesz.com](https://taofeeq.btesz.com)
**Monitoring:** [https://taofeeq.btesz.com/grafana](https://taofeeq.btesz.com/grafana)

---

## What Makes This Different

Most portfolio sites are deployed with a single `git push` to a hosting platform. This one is different — every aspect of the infrastructure was designed, built, and secured manually to demonstrate real DevOps engineering skills:

- **Zero-downtime blue-green deployments** with automated health checks
- **Full CI/CD pipeline** with quality, security, build, and deploy stages
- **Production monitoring** with Prometheus and Grafana dashboards
- **Security-first architecture** — Trivy scanning, port isolation, SSL/TLS automation
- **Container image registry** using GitHub Container Registry (GHCR)
- **Automated vulnerability scanning** with policy enforcement

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                         │
│                     github.com/mrbhi/devops-portfolio            │
└────────────────────────────┬────────────────────────────────────┘
                             │ git push → triggers workflow
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Actions Pipeline                        │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ quality  │→ │ security │→ │  build   │→ │    deploy    │   │
│  │          │  │          │  │          │  │              │   │
│  │ lint     │  │  trivy   │  │  docker  │  │  SSH to VM   │   │
│  │ typecheck│  │  scan    │  │  build   │  │  pull image  │   │
│  │ build    │  │  CRITICAL│  │  push to │  │  blue-green  │   │
│  │          │  │  HIGH    │  │  GHCR    │  │  swap        │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ docker pull from GHCR
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Azure VM (B2ats v2)                         │
│                     taofeeq.btesz.com                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    nginx Reverse Proxy                      │ │
│  │              SSL/TLS via Let's Encrypt                      │ │
│  │         taofeeq.btesz.com → app (3001/3002)                │ │
│  │         taofeeq.btesz.com/grafana → Grafana (3003)         │ │
│  └──────────────┬─────────────────────┬───────────────────────┘ │
│                 │                     │                          │
│  ┌──────────────▼──────────┐  ┌───────▼─────────────────────┐  │
│  │    Blue-Green Deploy     │  │   Monitoring Stack           │  │
│  │                          │  │                              │  │
│  │  ┌─────────┐ ┌────────┐ │  │  ┌──────────┐ ┌──────────┐  │  │
│  │  │app-blue │ │app-grn │ │  │  │Prometheus│ │ Grafana  │  │  │
│  │  │  :3001  │ │  :3002 │ │  │  │  :9090   │ │  :3003   │  │  │
│  │  │ (live)  │ │(standby│ │  │  │localhost │ │localhost │  │  │
│  │  └─────────┘ └────────┘ │  │  └──────────┘ └──────────┘  │  │
│  └─────────────────────────┘  │  ┌──────────────────────────┐│  │
│                                │  │     Node Exporter        ││  │
│                                │  │   host network mode      ││  │
│                                │  └──────────────────────────┘│  │
│                                └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Application
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | Frontend framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| shadcn/ui | Component library |

### Infrastructure
| Technology | Purpose |
|---|---|
| Azure VM (B2ats v2) | Compute — Ubuntu 22.04 |
| Docker + Docker Compose | Containerization |
| GitHub Container Registry | Image storage |
| nginx 1.18 | Reverse proxy + SSL termination |
| Let's Encrypt / Certbot | Automated SSL/TLS |

### CI/CD Pipeline
| Technology | Purpose |
|---|---|
| GitHub Actions | Pipeline orchestration |
| Trivy | Container and filesystem vulnerability scanning |
| docker/build-push-action | Image build and push |
| appleboy/ssh-action | Remote deployment via SSH |

### Monitoring
| Technology | Purpose |
|---|---|
| Prometheus | Metrics collection and storage |
| Grafana | Metrics visualization and dashboards |
| Node Exporter | VM-level metrics (CPU, memory, disk, network) |
| cAdvisor | Docker container metrics |

---

## CI/CD Pipeline Deep Dive

### Pipeline Jobs

```yaml
quality → security → build → deploy → rollback (on failure)
```

**1. Quality Job**
- Checkout code
- Setup Node.js 20 with npm cache
- Run `npm ci` — deterministic install
- Run `npm run lint` — ESLint checks
- Run `npm run type-check` — TypeScript compilation
- Run `npm run build` — production build verification

**2. Security Job**
- Run Trivy filesystem scan
- Block on CRITICAL and HIGH vulnerabilities
- Uses `.trivyignore` for documented exceptions
- Pinned to `aquasecurity/trivy-action@v0.35.0` (safe version)

**3. Build Job**
- Authenticate with GHCR using `GITHUB_TOKEN` (no PAT needed)
- Build multi-stage Docker image
- Push to `ghcr.io/mrbhi/devops-portfolio:latest`
- Images cached between builds

**4. Deploy Job**
- SSH into Azure VM using Ed25519 key
- Pull latest image from GHCR
- Execute `deploy.sh` — blue-green swap
- Health check before traffic switch
- nginx reload for zero-downtime cutover

**5. Rollback Job** (on deploy failure)
- Triggered automatically if deploy fails
- Restarts previous container
- Restores nginx upstream
- Maintains service availability

### Blue-Green Deployment Logic

```bash
# deploy.sh simplified flow
if [ app-blue is running ]; then
    # Deploy to green (inactive)
    docker run app-green from new image
    curl health check :3002
    # Switch nginx upstream to green
    sed -i 's/3001/3002/' nginx config
    nginx reload
    # Stop old blue
    docker stop app-blue
else
    # Mirror logic for blue
fi
```

---

## Security Architecture

### What's Secured

| Component | Security Measure |
|---|---|
| SSH Access | Ed25519 key pair, stored in GitHub Secrets |
| Container Images | Trivy-scanned before deployment |
| Prometheus | Bound to `127.0.0.1:9090` — no public access |
| Grafana | Bound to `127.0.0.1:3003` — nginx proxied only |
| SSL/TLS | Let's Encrypt, auto-renewed via certbot |
| Secrets | GitHub Secrets for CI, `.env` file on VM (never committed) |
| Old Domain | Redirects to new domain with 301 |

### GitHub Secrets Used

```
VM_HOST          → Azure VM IP address
VM_USER          → SSH username (azureuser)
VM_SSH_KEY       → Ed25519 private key (set via GitHub CLI)
GITHUB_TOKEN     → Auto-provided — used for GHCR
```

---

## Monitoring Stack

### Prometheus Targets

```yaml
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node'
    static_configs:
      - targets: ['172.17.0.1:9100']
```

### Grafana Dashboards

| Dashboard | ID | What it shows |
|---|---|---|
| Node Exporter Full | 1860 | VM CPU, memory, disk, network |
| Prometheus Stats | 3662 | Scrape health, target status |

### Key Metrics Monitored

- CPU utilization per core
- Memory used vs available
- Disk I/O read/write
- Network bytes in/out
- System uptime
- Container health status

---

## Infrastructure Setup (From Scratch)

### Prerequisites

- Azure account with VM provisioned (Ubuntu 22.04, B2ats v2)
- Domain configured in Namecheap DNS pointing to VM IP
- GitHub repository created

### Step 1 — VM Initial Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install nginx and certbot
sudo apt install nginx certbot python3-certbot-nginx -y

# Create app directory
sudo mkdir -p /var/www/devops-portfolio
sudo chown $USER:$USER /var/www/devops-portfolio
```

### Step 2 — Clone Repository

```bash
cd /var/www
git clone https://github.com/mrbhi/devops-portfolio.git
cd devops-portfolio
```

### Step 3 — Create Environment File

```bash
nano .env
```

```env
GHCR_TOKEN=your-github-personal-access-token
GHCR_USER=mrbhi
GRAFANA_PASSWORD=your-strong-password
GF_SERVER_ROOT_URL=http://taofeeq.btesz.com/grafana/
GF_SERVER_SERVE_FROM_SUB_PATH=true
GF_SERVER_PROTOCOL=http
GF_SERVER_ENFORCE_DOMAIN=false
GF_SERVER_DOMAIN=taofeeq.btesz.com
```

### Step 4 — Configure nginx

```bash
sudo nano /etc/nginx/sites-available/devops
# Paste nginx configuration (see nginx.conf in repo)
sudo ln -s /etc/nginx/sites-available/devops /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5 — SSL Certificate

```bash
sudo certbot --nginx -d taofeeq.btesz.com
```

### Step 6 — GitHub Secrets

```bash
# Install GitHub CLI
winget install GitHub.cli  # Windows
# or
brew install gh             # Mac

# Authenticate
gh auth login

# Set secrets from repo directory
gh secret set VM_SSH_KEY --env Production < ~/.ssh/id_ed25519
gh secret set VM_HOST --env Production  # enter IP when prompted
gh secret set VM_USER --env Production  # enter username when prompted
```

### Step 7 — Start Monitoring Stack

```bash
cd /var/www/devops-portfolio
docker compose -f docker-compose.monitoring.yml up -d
```

### Step 8 — Bootstrap Blue-Green

```bash
# Pull and start initial container
echo $GHCR_TOKEN | docker login ghcr.io -u mrbhi --password-stdin
docker pull ghcr.io/mrbhi/devops-portfolio:latest
docker run -d --name app-blue -p 3001:80 ghcr.io/mrbhi/devops-portfolio:latest
```

---

## Project Structure

```
devops-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── src/
│   ├── components/             # React components
│   ├── data/
│   │   └── projects.ts         # Projects data
│   └── pages/                  # Page components
├── public/
│   └── images/                 # Project SVG images
├── Dockerfile                  # Multi-stage build
├── docker-compose.app.yml      # Blue-green app stack
├── docker-compose.monitoring.yml # Prometheus/Grafana stack
├── prometheus.yml              # Prometheus scrape config (VM only)
├── deploy.sh                   # Blue-green deployment script
├── .trivyignore                # Documented CVE exceptions
├── .dockerignore               # Docker build exclusions
└── .gitignore                  # Git exclusions
```

---

## Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

Key decisions:
- **Multi-stage build** — builder image discarded, only nginx + dist shipped
- **Alpine base** — minimal attack surface, smallest image size
- **npm ci** — deterministic, reproducible installs
- **`--prefer-offline`** — uses cache when available, more resilient to network issues

---

## Common Issues and Resolutions

This section documents real issues encountered during setup — useful for troubleshooting and interview discussions.

### SSH Key Issues

**Problem:** `ssh: no key found` despite secret being set

**Root cause:** Windows CRLF line endings corrupting the private key when pasted into GitHub secrets UI

**Resolution:**
```bash
# Use GitHub CLI to set key directly from file (preserves line endings)
Get-Content C:\Users\user\.ssh\id_rsa -Raw | gh secret set VM_SSH_KEY --env Production
```

### Trivy Version Issue

**Problem:** `Unable to resolve action aquasecurity/trivy-action@0.28.0`

**Root cause:** Version 0.28.0 doesn't exist. Additionally, versions 0.0.1-0.34.2 were compromised in a March 2026 supply chain attack

**Resolution:** Pin to `@v0.35.0` — the first safe version after the incident

### Docker Build Timeout

**Problem:** `npm run build` timing out after 30 minutes on VM

**Root cause:** Azure B2ats v2 VM has limited CPU — TypeScript compilation + Vite bundling was too slow

**Resolution:** Moved Docker build to GitHub Actions runners (more powerful), VM now only pulls and runs pre-built images

### Grafana Redirect Loop

**Problem:** `ERR_TOO_MANY_REDIRECTS` when accessing `/grafana/`

**Root cause:** Multiple layers of misconfiguration:
1. nginx `auth_basic` cached in `sites-enabled` (different file from `sites-available`)
2. Grafana `GF_SERVER_ROOT_URL` using `https://` causing internal redirect loop
3. Browser cookie cache from previous failed attempts

**Resolution:**
```bash
# Fix sites-enabled vs sites-available discrepancy
sudo rm /etc/nginx/sites-enabled/devops
sudo cp /etc/nginx/sites-available/devops /etc/nginx/sites-enabled/devops

# Set correct Grafana env
GF_SERVER_ROOT_URL=http://taofeeq.btesz.com/grafana/
GF_SERVER_PROTOCOL=http
GF_SERVER_ENFORCE_DOMAIN=false

# Full restart (not just restart) to pick up new env
docker compose -f docker-compose.monitoring.yml down
docker compose -f docker-compose.monitoring.yml up -d
```

### Prometheus Can't Scrape Node Exporter

**Problem:** Node Exporter showing as DOWN in Prometheus targets

**Root cause:** Prometheus runs in a Docker container — `127.0.0.1:9100` resolves to the container's own loopback, not the host

**Resolution:** Use Docker bridge IP and `network_mode: host` for node-exporter:
```yaml
node-exporter:
  network_mode: host  # runs on host network, accessible via 172.17.0.1
```

---

## Interview Talking Points

This project demonstrates:

**1. End-to-end pipeline ownership** — from code quality gates to production deployment, every stage was designed and debugged personally

**2. Real troubleshooting experience** — SSH key CRLF issues, Trivy supply chain attack awareness, Grafana redirect loops, Docker networking — all real problems solved

**3. Security mindset** — Trivy scanning as a pipeline gate, port isolation, no secrets in code, Ed25519 keys over RSA, `.trivyignore` with documented rationale

**4. Zero-downtime deployments** — blue-green pattern with health checks and automatic rollback on failure

**5. Observability** — Prometheus + Grafana monitoring VM metrics in real-time, not just deploying and hoping

**6. Cost awareness** — entire stack runs on Azure free credits, B2ats v2 VM costs $0.27/month demonstrating cost-conscious architecture choices

---

## Author

**Taofeeq Bello** — DevOps Engineer and Cloud Architect

- Website: [taofeeq.btesz.com](https://taofeeq.btesz.com)
- LinkedIn: [linkedin.com/in/taofeeq-bello-b0526b207](https://linkedin.com/in/taofeeq-bello-b0526b207)
- GitHub: [github.com/mrbhi](https://github.com/mrbhi)
- Email: taofeeqworld01@gmail.com

---

## License

MIT License — see [LICENSE](LICENSE) for details.