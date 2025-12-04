# Mobil Buyurtma Shakli

TableCRM.com sayti uchun React dasturchisi lavozimi test topshirig'i - mobil buyurtma shakli.

## Texnologiyalar

- React 18
- Vite
- Tailwind CSS
- Axios

## O'rnatish

```bash
npm install
```

## Konfiguratsiya

Loyiha `.env` faylidan API URL ni o'qiydi. Agar `.env` fayl bo'lmasa, default qiymat ishlatiladi.

`.env.example` faylini `.env` ga nusxalang va kerakli o'zgarishlarni qiling:

```bash
# .env fayl yaratish (ixtiyoriy)
VITE_API_BASE_URL=https://app.tablecrm.com/api/v1
```

## Ishga tushirish

```bash
npm run dev
```

Loyiha `http://localhost:5173` da ochiladi.

## Build qilish

```bash
npm run build
```

Build qilingan fayllar `dist/` papkasida yaratiladi.

## Vercel ga deploy qilish

### 1-usul: Vercel CLI orqali

```bash
# Vercel CLI o'rnatish
npm i -g vercel

# Deploy qilish
vercel

# Production ga deploy qilish
vercel --prod
```

### 2-usul: GitHub orqali

1. Loyihani GitHub ga yuklang
2. Vercel.com ga kiring
3. "New Project" ni bosing
4. GitHub repository ni tanlang
5. Framework preset: Vite
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. "Deploy" ni bosing

### 3-usul: Vercel Dashboard orqali

1. Vercel.com ga kiring va login qiling
2. "Add New..." → "Project" ni tanlang
3. GitHub repository ni import qiling
4. Settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. "Deploy" ni bosing

## Environment Variables (Vercel)

Agar `.env` fayl ishlatilsa, Vercel da Environment Variables qo'shing:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. `VITE_API_BASE_URL` qo'shing
3. Value: `https://app.tablecrm.com/api/v1`

## Funksionallik

- Token orqali avtorizatsiya
- Mijozlarni telefon raqami bo'yicha qidirish
- Hisoblar, omborlar, tashkilotlar, narx turlarini tanlash
- Mahsulotlarni qidirish va tanlash
- Savdo yaratish va "yaratish va to'ldirish" funksiyalari

## API Endpoints

- Mijozlar: `/api/v1/contragents`
- Omborlar: `/api/v1/warehouses`
- Hisoblar: `/api/v1/payboxes`
- Tashkilotlar: `/api/v1/organizations`
- Narx turlari: `/api/v1/price_types`
- Mahsulotlar: `/api/v1/nomenclature`
- Savdo yaratish: `/api/v1/docs_sales` (POST)

