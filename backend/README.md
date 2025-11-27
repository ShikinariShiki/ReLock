# ReLock Backend API (Laravel)

A RESTful API for the ReLock job portal platform, built with Laravel 12 and Sanctum authentication.

## Requirements

- PHP 8.2+
- Composer 2.x
- SQLite (default) or MySQL/PostgreSQL
- Node.js 18+ (for development assets)

## Quick Start

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database (for development)
touch database/database.sqlite

# Run migrations
php artisan migrate

# Seed with sample data (optional)
php artisan db:seed

# Create storage symlink
php artisan storage:link

# Start development server
php artisan serve
```

The API will be available at `http://localhost:8000`

## Test Accounts (after seeding)

### Candidates
| Email | Password |
|-------|----------|
| john@example.com | password123 |
| sarah@example.com | password123 |
| michael@example.com | password123 |

### Recruiters
| Email | Password |
|-------|----------|
| hr@techcorp.com | password123 |
| talent@startuphub.io | password123 |
| careers@globalfinance.co.id | password123 |

## API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication

All protected endpoints require a Bearer token:
```
Authorization: Bearer {token}
```

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/health` | Basic health check |
| GET | `/v1/health/db` | Database connection check |

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/v1/register/candidate` | Register as candidate | No |
| POST | `/v1/register/recruiter` | Register as recruiter | No |
| POST | `/v1/login` | Login (both roles) | No |
| POST | `/v1/logout` | Logout | Yes |
| GET | `/v1/me` | Get current user info | Yes |

### Candidate Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/v1/candidate/profile` | Get profile | Yes (Candidate) |
| PUT | `/v1/candidate/profile` | Update profile | Yes (Candidate) |
| POST | `/v1/candidate/upload-cv` | Upload CV (PDF) | Yes (Candidate) |
| GET | `/v1/candidate/applications` | My job applications | Yes (Candidate) |

### Recruiter Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/v1/recruiter/profile` | Get profile | Yes (Recruiter) |
| PUT | `/v1/recruiter/profile` | Update profile | Yes (Recruiter) |
| POST | `/v1/recruiter/upload-logo` | Upload company logo | Yes (Recruiter) |
| GET | `/v1/recruiter/dashboard` | Dashboard with stats | Yes (Recruiter) |

### Job Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/v1/jobs` | List all active jobs | No |
| GET | `/v1/jobs/{id}` | Get job detail | No |
| POST | `/v1/jobs` | Create job | Yes (Recruiter) |
| PUT | `/v1/jobs/{id}` | Update job | Yes (Recruiter) |
| DELETE | `/v1/jobs/{id}` | Delete job | Yes (Recruiter) |
| GET | `/v1/jobs/{id}/applicants` | View applicants | Yes (Recruiter) |

#### Job Listing Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search in title, company, location, description |
| type | string | Filter by job type (Full Time, Part Time, etc.) |
| mode | string | Filter by work mode (On-site, Remote, Hybrid) |
| level | string | Filter by experience level |
| location | string | Filter by location |
| salary_min | number | Minimum salary filter |
| salary_max | number | Maximum salary filter |
| sort_by | string | Sort field (created_at, deadline, title, salary_min) |
| sort_order | string | Sort direction (asc, desc) |
| per_page | number | Items per page (max 50) |

### Application Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/v1/jobs/{id}/apply` | Apply for job | Yes (Candidate) |
| GET | `/v1/applications/{id}` | View application detail | Yes |
| PUT | `/v1/applications/{id}/status` | Update status | Yes (Recruiter) |
| DELETE | `/v1/applications/{id}` | Withdraw application | Yes (Candidate) |

## Request Examples

### Register Candidate

```json
POST /api/v1/register/candidate
Content-Type: application/json

{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

### Register Recruiter

```json
POST /api/v1/register/recruiter
Content-Type: application/json

{
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@company.com",
    "password": "password123",
    "password_confirmation": "password123",
    "company_name": "Tech Corp",
    "company_website": "https://techcorp.com"
}
```

### Login

```json
POST /api/v1/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

### Create Job

```json
POST /api/v1/jobs
Content-Type: application/json
Authorization: Bearer {token}

{
    "title": "Frontend Developer",
    "company_name": "Tech Corp",
    "location": "Jakarta, Indonesia",
    "department": "Engineering",
    "type": "Full Time",
    "mode": "Remote",
    "level": "Entry Level (1-3 Years)",
    "deadline": "2025-12-31",
    "duration": "Permanent",
    "salary_min": 5000000,
    "salary_max": 10000000,
    "contact_name": "HR Manager",
    "contact_email": "hr@techcorp.com",
    "contact_phone": "+62812345678",
    "description": "We are looking for...",
    "responsibilities": "- Build UI components\n- Collaborate with team",
    "requirements": "- 1+ years React experience\n- TypeScript",
    "benefits": "- Health insurance\n- Remote work"
}
```

### Apply for Job

```json
POST /api/v1/jobs/1/apply
Content-Type: multipart/form-data
Authorization: Bearer {token}

cv_type: existing | new
cv: (file, required if cv_type is "new")
```

## Response Format

### Success Response

```json
{
    "message": "Success message",
    "data": { ... }
}
```

### Error Response

```json
{
    "message": "Error description",
    "error": "error_code",
    "errors": {
        "field": ["Validation error message"]
    }
}
```

### Pagination Response

```json
{
    "data": [...],
    "meta": {
        "total": 100,
        "per_page": 10,
        "current_page": 1,
        "last_page": 10,
        "from": 1,
        "to": 10
    },
    "links": {
        "first": "http://...",
        "last": "http://...",
        "prev": null,
        "next": "http://..."
    }
}
```

## Rate Limiting

| Endpoint Type | Limit |
|--------------|-------|
| Authentication | 10 requests/minute |
| API Endpoints | 60 requests/minute |
| File Uploads | 10 requests/minute |

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/   # API Controllers
│   │   ├── Middleware/        # Custom middleware
│   │   ├── Requests/          # Form Request validation
│   │   └── Resources/         # API Resources
│   ├── Models/                # Eloquent models
│   └── Providers/             # Service providers
├── config/
│   ├── relock.php             # App-specific config
│   └── ...
├── database/
│   ├── migrations/            # Database migrations
│   └── seeders/               # Database seeders
├── routes/
│   └── api.php                # API routes
├── storage/
│   └── app/public/            # Uploaded files
└── tests/                     # Feature & unit tests
```

## Development Commands

```bash
# Run tests
php artisan test

# Run with coverage
php artisan test --coverage

# Clear caches
php artisan optimize:clear

# View routes
php artisan route:list --path=api

# Fresh migration with seeding
php artisan migrate:fresh --seed

# Run queue worker
php artisan queue:work

# View logs in real-time
php artisan pail
```

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment guide.

## Environment Variables

See [.env.example](./.env.example) for all available configuration options.

## License

MIT
