# Personal Expense Tracker

## Prasyarat

- PHP 8.2+ & Composer
- Node.js 18+
- Git

## Instalasi Cepat

1. Clone repo

```bash
git clone https://github.com/raflyrzp/personal-expense-tracker<.git
cd personal-expense-tracker
```

2. Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

mkdir -p database

php artisan migrate
php artisan serve
```

3. Frontend (React + Bootstrap)

```bash
cd ../frontend
pnpm install
pnpm run dev
```

## Penggunaan

- Buka http://localhost:5173
- Tambah beberapa expense (Create)
- Lihat semua, filter kategori, edit, dan hapus
- Total otomatis mengikuti filter

## Endpoints API

- GET /api/expenses
- GET /api/expenses?category=Food
- GET /api/expenses/:id
- POST /api/expenses
- PUT /api/expenses/:id
- DELETE /api/expenses/:id
