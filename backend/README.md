# ReLock API

The ReLock backend provides a versioned REST API for candidate accounts, recruiter accounts, job listings, saved vacancies, and applications. It is built with Laravel 12 and uses Sanctum for authenticated requests.

For the product overview and the React frontend, see the [repository README](../README.md).

## Local setup

Requirements: PHP 8.2+, Composer, and an SQL database driver. The included example configuration uses SQLite.

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Create `database/database.sqlite` if the SQLite database file is not present, then run:

```bash
php artisan migrate
php artisan db:seed
php artisan serve
```

The development API base URL is `http://127.0.0.1:8000/api/v1`.

To view registered routes, use `php artisan route:list --path=api`.

## API routes

All paths in the following tables are relative to `/api/v1`.

### Public and account routes

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | API health response |
| GET | `/health/db` | Database connectivity check |
| POST | `/register/candidate` | Create a candidate account |
| POST | `/register/recruiter` | Create a recruiter account |
| POST | `/login` | Sign in |
| GET | `/jobs` | Search job listings |
| GET | `/jobs/{id}` | Retrieve a job listing |
| GET | `/auth/google` | Begin Google sign-in |
| GET | `/auth/google/callback` | Google callback |
| POST | `/auth/google/token` | Handle a Google token |

### Authenticated account routes

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/me` | Current account |
| POST | `/logout` | End the session |

Protected routes use the `auth:sanctum` middleware and are accessed using an authorized bearer token.

### Candidate routes

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/kandidat/profile` | View candidate profile |
| PUT | `/kandidat/profile` | Update candidate profile |
| POST | `/kandidat/upload-cv` | Upload CV |
| POST | `/kandidat/upload-photo` | Upload profile photo |
| GET | `/kandidat/bookmarks` | List bookmarked jobs |
| GET | `/kandidat/applications` | List submitted applications |
| POST | `/kandidat/bookmarks/{jobId}` | Bookmark a job |
| GET | `/kandidat/bookmarks/{jobId}/check` | Check bookmark status |
| DELETE | `/kandidat/bookmarks/{jobId}` | Remove bookmark |
| POST | `/jobs/{jobId}/apply` | Submit an application |

### Recruiter routes

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/rekruter/profile` | View company profile |
| PUT | `/rekruter/profile` | Update company profile |
| POST | `/rekruter/upload-logo` | Upload a company logo |
| GET | `/rekruter/dashboard` | Dashboard data |
| POST | `/jobs` | Create a vacancy |
| PUT | `/jobs/{id}` | Edit a vacancy |
| DELETE | `/jobs/{id}` | Remove a vacancy |
| GET | `/jobs/{id}/applicants` | View applicants |
| PUT | `/applications/{id}/status` | Update application status |

Role-specific routes use the `kandidat` or `rekruter` middleware in addition to authentication.

## Example request

```bash
curl http://127.0.0.1:8000/api/v1/health
```

An authenticated request includes an authorization header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

The API's current endpoint definitions are maintained in [routes/api.php](routes/api.php).

## Sample data

The database seeders create example candidates, recruiters, vacancies, and applications for local exploration. Seeded account details are printed by `DatabaseSeeder` when seeding completes. Use `php artisan migrate:fresh --seed` only when it is safe to reset the current local database.

## Development commands

```bash
php artisan test
php artisan route:list --path=api
php artisan optimize:clear
```

Deployment configuration is covered in [DEPLOYMENT.md](DEPLOYMENT.md), and environment variables are documented in [.env.example](.env.example).
