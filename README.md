# Personal Expense Tracker

## Spesifikasi

- PHP 8.2+ & Composer
- Node.js 18+
- Git

## Instalasi

1. Clone repo

```bash
git clone https://github.com/raflyrzp/personal-expense-tracker.git
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

- Create

  1. Klik tombol "Create" di navbar.
  2. Isi form:
     - Amount: angka positif (mis. 25.50)
     - Description: teks singkat (mis. Lunch at cafe)
     - Category: pilih salah satu (Food, Transport, Shopping, Other)
  3. Klik tombol "Add".
  4. Setelah berhasil, Anda akan kembali ke halaman Index dan pesan sukses muncul. Item baru tampil di tabel, dan Total bertambah.

- Edit

  1. Di halaman Index, cari item yang ingin diubah dan klik tombol "Edit" pada baris tersebut.
  2. Ubah nilai Amount, Description, atau Category sesuai kebutuhan.
  3. Klik tombol "Update".
  4. Setelah berhasil, Anda akan kembali ke halaman Index dengan pesan sukses. Data di tabel dan Total akan terbarui.

- Delete
  1. Di halaman Index, klik tombol "Delete" pada baris item yang ingin dihapus.
  2. Item akan dihapus dari daftar.
  3. Pesan sukses akan muncul dan Total akan berkurang sesuai jumlah yang dihapus.
