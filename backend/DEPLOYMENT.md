# Production Deployment Guide for ReLock Backend

## Prerequisites

- PHP 8.2+
- Composer 2.x
- MySQL 8.0+ or PostgreSQL 14+
- Redis (recommended for production)
- Nginx or Apache

## Quick Setup

```bash
# Clone and navigate
cd backend

# Install dependencies (production mode)
composer install --no-dev --optimize-autoloader

# Copy and configure environment
cp .env.example .env
php artisan key:generate

# Configure your .env file with production values
# See "Environment Configuration" section below
```

## Environment Configuration

### Required Changes for Production

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

# Frontend URL for CORS
FRONTEND_URL=https://yourdomain.com

# Stronger encryption
BCRYPT_ROUNDS=14

# Database (use MySQL or PostgreSQL)
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=relock
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password

# Use Redis for better performance
SESSION_DRIVER=redis
CACHE_STORE=redis
QUEUE_CONNECTION=redis

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=error

# Sanctum
SANCTUM_STATEFUL_DOMAINS=yourdomain.com,api.yourdomain.com
```

## Database Setup

```bash
# Run migrations
php artisan migrate --force

# (Optional) Seed with sample data
php artisan db:seed

# Create storage link
php artisan storage:link
```

## Performance Optimization

```bash
# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize autoloader
composer dump-autoload --optimize
```

## Nginx Configuration

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.yourdomain.com;
    root /var/www/relock/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Gzip compression
    gzip on;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_vary on;
    gzip_types
        application/json
        application/javascript
        text/css
        text/plain;
}
```

## Queue Worker (for background jobs)

Create a systemd service file `/etc/systemd/system/relock-worker.service`:

```ini
[Unit]
Description=ReLock Queue Worker
After=network.target

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/relock/backend/artisan queue:work --sleep=3 --tries=3 --max-time=3600

[Install]
WantedBy=multi-user.target
```

Then enable and start:

```bash
sudo systemctl enable relock-worker
sudo systemctl start relock-worker
```

## Cron Jobs (for scheduled tasks)

Add to crontab:

```cron
* * * * * cd /var/www/relock/backend && php artisan schedule:run >> /dev/null 2>&1
```

## Health Checks

The API provides health check endpoints:

- `GET /api/v1/health` - Basic health check
- `GET /api/v1/health/db` - Database connection check

## SSL Certificate

Use Let's Encrypt with Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

## File Permissions

```bash
# Set proper ownership
sudo chown -R www-data:www-data /var/www/relock/backend

# Set permissions
sudo chmod -R 755 /var/www/relock/backend
sudo chmod -R 775 /var/www/relock/backend/storage
sudo chmod -R 775 /var/www/relock/backend/bootstrap/cache
```

## Monitoring

Consider using:
- **Laravel Telescope** - For debugging (disable in production)
- **Sentry** - For error tracking
- **New Relic / Datadog** - For APM

## Backup Strategy

```bash
# Database backup
mysqldump -u user -p relock > backup_$(date +%Y%m%d).sql

# Storage backup
tar -czf storage_$(date +%Y%m%d).tar.gz storage/app/public/
```

## Scaling Considerations

1. **Horizontal Scaling**: Use load balancer with multiple app servers
2. **Database**: Consider read replicas for read-heavy workloads
3. **Caching**: Implement Redis caching for frequent queries
4. **CDN**: Use CloudFlare or AWS CloudFront for static assets
5. **Queue Workers**: Scale workers based on job volume

## Security Checklist

- [ ] APP_DEBUG is set to false
- [ ] APP_KEY is generated and kept secret
- [ ] Database credentials are secure
- [ ] HTTPS is enforced
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] File upload limits are set
- [ ] SQL injection prevention (use Eloquent)
- [ ] XSS prevention (use Blade escaping)
- [ ] CSRF protection (enabled by default)

## Troubleshooting

### Clear all caches

```bash
php artisan optimize:clear
```

### View logs

```bash
tail -f storage/logs/laravel.log
```

### Check PHP extensions

```bash
php -m | grep -E 'pdo|mysql|redis|mbstring|openssl|json'
```
