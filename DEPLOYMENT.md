# FinTrack Deployment Guide

## Overview

This guide covers deploying FinTrack to production environments.

---

## Prerequisites

- Node.js 18+ installed on server
- Git access to repository
- Domain name (optional)
- SSL certificate (recommended)

---

## Backend Deployment

### Option 1: Traditional Server (VPS)

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### 2. Clone and Setup

```bash
# Clone repository
git clone <repository-url>
cd FinTrack/server

# Install dependencies
npm install --production

# Create data directory
mkdir -p data
```

#### 3. Configure Environment

Create `.env` file:
```env
PORT=3000
NODE_ENV=production
DATABASE_PATH=./data/fintrack.db
```

#### 4. Start with PM2

```bash
# Start server
pm2 start server.js --name fintrack-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### 5. Configure Nginx (Reverse Proxy)

```nginx
server {
    listen 80;
    server_name api.fintrack.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 6. SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.fintrack.com
```

---

### Option 2: Docker Deployment

#### Dockerfile (Backend)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: ./server
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### Deploy

```bash
docker-compose up -d
```

---

## Frontend Deployment

### Build for Production

```bash
cd web/FinTrack-Web

# Install dependencies
npm install

# Build
npm run build
```

This creates a `dist/` folder with optimized static files.

---

### Option 1: Static Hosting (Netlify, Vercel)

#### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

#### Vercel

```bash
npm install -g vercel
vercel --prod
```

---

### Option 2: Traditional Server

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name fintrack.com;
    root /var/www/fintrack/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Deploy Steps

```bash
# Copy build files to server
scp -r dist/* user@server:/var/www/fintrack/dist/

# Restart Nginx
sudo systemctl restart nginx
```

---

### Option 3: Docker

#### Dockerfile (Frontend)

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Environment Configuration

### Frontend Environment Variables

Create `.env.production`:

```env
VITE_API_URL=https://api.fintrack.com
```

Update `src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
```

---

## Database Backup

### Automated Backup Script

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/fintrack"
DB_PATH="/app/data/fintrack.db"

mkdir -p $BACKUP_DIR
cp $DB_PATH $BACKUP_DIR/fintrack_$DATE.db

# Keep only last 30 days
find $BACKUP_DIR -name "fintrack_*.db" -mtime +30 -delete
```

### Cron Job

```bash
# Run daily at 2 AM
0 2 * * * /path/to/backup.sh
```

---

## Monitoring

### PM2 Monitoring

```bash
# View logs
pm2 logs fintrack-api

# Monitor resources
pm2 monit

# View status
pm2 status
```

### Health Check Endpoint

Add to `server.js`:

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

---

## Security Checklist

- [ ] Enable HTTPS (SSL/TLS)
- [ ] Configure CORS properly
- [ ] Use environment variables for sensitive data
- [ ] Enable rate limiting
- [ ] Regular security updates
- [ ] Database backups
- [ ] Firewall configuration
- [ ] Strong passwords/authentication

---

## Performance Optimization

### Frontend

- Enable gzip compression in Nginx
- Use CDN for static assets
- Implement service worker for caching
- Lazy load routes

### Backend

- Add database indexes
- Implement caching (Redis)
- Use connection pooling
- Enable compression middleware

---

## Troubleshooting

### Server Won't Start

```bash
# Check logs
pm2 logs fintrack-api

# Check port availability
sudo lsof -i :3000

# Restart service
pm2 restart fintrack-api
```

### Database Issues

```bash
# Check database file permissions
ls -l data/fintrack.db

# Verify database integrity
sqlite3 data/fintrack.db "PRAGMA integrity_check;"
```

### Frontend Not Loading

- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Verify API URL in frontend build
- Check browser console for errors

---

## Rollback Procedure

### Backend

```bash
# Stop current version
pm2 stop fintrack-api

# Checkout previous version
git checkout <previous-commit>

# Install dependencies
npm install

# Restart
pm2 restart fintrack-api
```

### Frontend

```bash
# Deploy previous build
cp -r dist.backup/* /var/www/fintrack/dist/
```

---

## Scaling

### Horizontal Scaling

Use PM2 cluster mode:

```bash
pm2 start server.js -i max --name fintrack-api
```

### Load Balancer

Configure Nginx as load balancer:

```nginx
upstream fintrack_backend {
    server localhost:3000;
    server localhost:3001;
    server localhost:3002;
}

server {
    location / {
        proxy_pass http://fintrack_backend;
    }
}
```

---

## Maintenance

### Update Procedure

1. Backup database
2. Pull latest code
3. Install dependencies
4. Run migrations (if any)
5. Restart services
6. Verify functionality

### Scheduled Maintenance

```bash
# Create maintenance page
echo "Under maintenance" > /var/www/maintenance.html

# Redirect in Nginx
location / {
    return 503;
}

error_page 503 /maintenance.html;
location = /maintenance.html {
    root /var/www;
}
```

---

This deployment guide provides comprehensive instructions for deploying FinTrack in various environments.
