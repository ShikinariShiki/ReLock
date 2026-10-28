# ReLock

**A job-search and recruitment platform built around two distinct workflows.**

ReLock connects job seekers with employers through role-specific experiences. Candidates can browse positions, manage their profiles, save opportunities, and apply for jobs. Recruiters can publish vacancies, manage listings, and review applicants.

[Explore ReLock](https://re-lock.vercel.app)

## Product overview

The application is organized into two workspaces:

| Candidate experience | Recruiter experience |
| --- | --- |
| Search and browse job listings | Create and manage job listings |
| View vacancy details | Review candidates for a vacancy |
| Manage a personal profile | Manage a company profile |
| Save opportunities and track applications | Update application status |
| Upload a CV | Review applicant information |

Separate registration and sign-in flows direct each role to its relevant workspace.

## Technology

ReLock uses a split frontend and backend architecture.

- **Frontend:** React 19, Vite 7, React Router, Tailwind CSS, and Framer Motion.
- **Backend:** Laravel 12, PHP 8.2+, Eloquent, and Laravel Sanctum.
- **Data:** Laravel migrations and seeders with a configurable SQL database.
- **API:** versioned REST endpoints under `/api/v1`.

## Run locally

### 1. Backend

Install PHP 8.2+, Composer, and the database driver required by your environment. From the repository root:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

The example environment uses SQLite. Create `database/database.sqlite` if it does not already exist, then run:

```bash
php artisan migrate
php artisan db:seed
php artisan serve
```

The API should be available at `http://127.0.0.1:8000/api/v1`.

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm ci
cp .env.example .env
npm run dev
```

The frontend reads `VITE_API_URL` from `frontend/.env`. The example points to `http://127.0.0.1:8000/api/v1`. Open the local URL displayed by Vite (typically `http://localhost:5173`).

## Main routes

The frontend provides separate sign-in and registration pages for candidates and recruiters, a candidate dashboard with saved jobs and profile pages, and a recruiter dashboard for vacancies and applicants.

The backend groups API routes by authorization level. Public routes include job search and job details; authenticated candidate routes cover profile updates, bookmarks, and applications, while recruiter routes cover company profiles, vacancy management, and application review.

See [backend/README.md](backend/README.md) for the API endpoints and developer commands.

## Repository structure

```text
ReLock/
├── frontend/
│   ├── src/pages/       Candidate, recruiter, and account screens
│   ├── src/components/  Reusable UI elements
│   ├── src/services/    API client
│   └── package.json
├── backend/
│   ├── app/             Controllers, models, and application logic
│   ├── routes/api.php   Versioned API routes
│   ├── database/        Migrations and seeders
│   ├── tests/           Laravel tests
│   └── composer.json
└── README.md
```

## Development checks

```bash
# Frontend
cd frontend
npm run lint
npm run build

# Backend (run from backend/)
php artisan test
php artisan route:list --path=api
```

---

ReLock · A role-based recruitment platform
