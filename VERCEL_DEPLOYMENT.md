# Vercel Deployment Guide

## Muammo: Vercel ga deploy qilgandan keyin ma'lumotlar olinmayapti

### Asosiy sabablar va yechimlar:

## 1. Environment Variables sozlash

Vercel Dashboard da quyidagi environment variable ni qo'shing:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Quyidagi variable ni qo'shing:

```
Key: VITE_API_BASE_URL
Value: https://app.tablecrm.com/api/v1
```

**Muhim:** 
- Production, Preview, Development - barcha environmentlar uchun qo'shing
- "Redeploy" tugmasini bosing (agar loyiha allaqachon deploy qilingan bo'lsa)

## 2. Build sozlamalari

Vercel avtomatik ravishda Vite ni aniqlaydi, lekin quyidagilarni tekshiring:

**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Vite o'rnatilganligini tekshirish:

Lokalda quyidagilarni bajaring:
```bash
# Dependencies ni o'rnatish
npm install

# Build qilish (xatolarni ko'rish uchun)
npm run build

# Agar build muvaffaqiyatli bo'lsa, dist/ papkasi yaratiladi
```

**Agar lokalda build ishlamasa:**
- `node_modules` papkasini o'chiring: `rm -rf node_modules`
- `package-lock.json` ni o'chiring: `rm package-lock.json`
- Qayta o'rnating: `npm install`
- Build qiling: `npm run build`

## 3. CORS muammosi

Agar CORS xatosi bo'lsa, `vite.config.js` ga proxy qo'shing:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://app.tablecrm.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
```

**Lekin:** Production build da proxy ishlamaydi. API server to'g'ridan-to'g'ri chaqiriladi.

## 4. Network xatolarini tekshirish

Browser DevTools → Network tab da:
- Qaysi so'rovlar muvaffaqiyatsiz bo'lyapti?
- Status code nima? (404, 500, CORS error?)
- Request URL to'g'rimi?

## 5. Console xatolarini tekshirish

Browser DevTools → Console tab da:
- Qanday xatolar ko'rsatilmoqda?
- API_BASE_URL to'g'ri o'qilayaptimi?

## 6. Token tekshirish

- Token to'g'ri kiritilganmi?
- Token haqiqiy va aktivmi?

## 7. Vercel Logs tekshirish

Vercel Dashboard → Project → Deployments → [Deployment] → Logs

Bu yerda build va runtime xatolarini ko'rasiz.

## 8. Qo'shimcha tekshiruvlar

### API Base URL tekshirish:
```javascript
// Browser console da:
console.log(import.meta.env.VITE_API_BASE_URL);
```

### Network so'rovlarini tekshirish:
- DevTools → Network → XHR
- API so'rovlarini ko'ring
- Request/Response ni tekshiring

## 9. Redeploy

Environment variable qo'shgandan keyin:
1. Vercel Dashboard → Deployments
2. Eng so'nggi deployment ni toping
3. "..." → "Redeploy" ni bosing

## 10. Production vs Development

Development da ishlayaptimi?
- Agar `npm run dev` da ishlayapti, lekin Vercel da ishlamasa:
  - Environment variable muammosi
  - Build muammosi
  - CORS muammosi

## Tezkor yechim:

### 1-qadam: Lokalda tekshiring
```bash
# Dependencies o'rnatish
npm install

# Build qilish
npm run build

# Agar xatolik bo'lsa, uni tuzating
```

### 2-qadam: Vercel da sozlang
1. Vercel Dashboard → Settings → Environment Variables
2. `VITE_API_BASE_URL` = `https://app.tablecrm.com/api/v1` qo'shing
3. **Barcha environmentlar uchun:** Production, Preview, Development
4. Save tugmasini bosing

### 3-qadam: Redeploy
1. Vercel Dashboard → Deployments
2. Eng so'nggi deployment ni toping
3. "..." → "Redeploy" ni bosing
4. Build jarayonini kuzating

### 4-qadam: Tekshirish
1. Browser → DevTools → Console
2. Browser → DevTools → Network → XHR
3. Xatolarni tekshiring

## Yordam kerak bo'lsa:

1. Browser Console xatolarini yuboring
2. Network tab → Failed requests ni yuboring
3. Vercel Logs ni yuboring
