# Deployment Guide

## Local Development

```bash
# Dependencies o'rnatish
npm install

# Development server ishga tushirish
npm run dev
```

Loyiha `http://localhost:5173` da ochiladi.

## Production Build

```bash
# Production build yaratish
npm run build

# Build ni preview qilish
npm run preview
```

## Vercel Deployment

### Option 1: Vercel CLI

```bash
# Vercel CLI o'rnatish
npm i -g vercel

# Login qilish
vercel login

# Deploy qilish
vercel

# Production ga deploy
vercel --prod
```

### Option 2: GitHub Integration

1. **GitHub ga push qiling:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Vercel Dashboard:**
   - https://vercel.com ga kiring
   - "New Project" ni bosing
   - GitHub repository ni tanlang
   - Auto-detect settings:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - "Deploy" ni bosing

### Option 3: Manual Upload

1. Vercel Dashboard → "New Project"
2. "Browse" orqali `dist/` papkasini yuklang
3. Deploy qiling

## Environment Variables

Agar `.env` fayl ishlatilsa:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Quyidagi o'zgaruvchilarni qo'shing:
   - `VITE_API_BASE_URL` = `https://app.tablecrm.com/api/v1`

## Custom Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Domain qo'shing va DNS sozlamalarini bajarish

## Troubleshooting

### Build xatoliklari

- `npm install` ni qayta ishga tushiring
- `node_modules` va `dist` papkalarini o'chirib, qayta o'rnating
- Node.js versiyasini tekshiring (v18+ tavsiya etiladi)

### API xatoliklari

- CORS muammosi bo'lishi mumkin
- Token to'g'riligini tekshiring
- Browser console da xatoliklarni ko'ring

