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

### Vite ishga tushganini tekshirish:

1. **Browser Console da:**
   - `npm run dev` ni ishga tushirgandan keyin
   - Browser → DevTools → Console
   - Quyidagi xabarlarni ko'rasiz:
     ```
     ✅ Vite Development mode ishga tushdi!
     🔧 Vite version: development
     🌐 API Base URL: ...
     ```

2. **Terminal da:**
   - `npm run dev` ni ishga tushirganda:
     ```
     VITE v5.x.x  ready in xxx ms
     ➜  Local:   http://localhost:5173/
     ➜  Network: use --host to expose
     ```

3. **Build tekshirish:**
   ```bash
   npm run build
   ```
   - Agar muvaffaqiyatli bo'lsa:
     ```
     ✓ built in x.xxs
     dist/ papkasi yaratiladi
     ```

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

## Environment Variables (Vercel) - MUHIM!

**Vercel ga deploy qilgandan keyin ma'lumotlar olinmay qolsa, bu sabab bo'lishi mumkin!**

Vercel Dashboard da quyidagi environment variable ni **MUTLAQO** qo'shing:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. "Add New" tugmasini bosing
3. Quyidagilarni kiriting:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://app.tablecrm.com/api/v1`
   - **Environment:** Production, Preview, Development (barchasini tanlang)
4. "Save" tugmasini bosing
5. **Redeploy qiling:** Deployments → Eng so'nggi deployment → "..." → "Redeploy"

**Eslatma:** Environment variable qo'shgandan keyin loyihani qayta deploy qilish kerak!

Batafsil ma'lumot uchun `VERCEL_DEPLOYMENT.md` faylini ko'ring.

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

