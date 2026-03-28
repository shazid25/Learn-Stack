# 🔐 Set Admin from .env - Complete Guide

## How It Works

Instead of manually setting admin in the database, you can now set it via `.env` file!

---

## Step-by-Step Setup

### 1. Update .env File

Add your admin email:

```bash
# Admin Configuration
ADMIN_EMAIL=test@gmail.com
```

Replace `test@gmail.com` with your actual email.

### 2. Create User Account First

1. Go to `http://localhost:3000/login`
2. Sign up with the same email: `test@gmail.com`
3. Set a password
4. Account will be auto-verified

### 3. Run Seed Script

```bash
npm run seed
```

**Output (if successful):**
```
✅ User test@gmail.com set as admin
```

### 4. Restart Dev Server

```bash
npm run dev
```

### 5. Log Out and Log Back In

1. Log out
2. Log back in with your email
3. Go to `http://localhost:3000/admin`
4. ✅ Should have admin access!

---

## What Was Created

### 1. `prisma/seed.ts`
- Reads `ADMIN_EMAIL` from `.env`
- Finds user by email in database
- Sets `role = 'admin'`

### 2. Updated `package.json`
- Added `"seed": "node --loader ts-node/esm prisma/seed.ts"` command

### 3. Updated `.env`
- Added `ADMIN_EMAIL=test@gmail.com`

---

## Troubleshooting

### ❌ User not found

**Error:** `❌ User with email test@gmail.com not found`

**Solution:**
1. Sign up first at `/login` with that email
2. Then run `npm run seed`

### ❌ ADMIN_EMAIL not set

**Error:** `❌ ADMIN_EMAIL not set in .env`

**Solution:**
1. Add `ADMIN_EMAIL=your-email@gmail.com` to `.env`
2. Run `npm run seed` again

### ❌ Not redirecting to admin

**Solution:**
1. Log out completely
2. Log back in
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try accessing `/admin` again

---

## Environment Variables

### .env
```bash
# Admin Configuration
ADMIN_EMAIL=test@gmail.com
```

---

## Alternative: Manual Database Update (Still Works)

You can also update directly if needed:

```sql
UPDATE "user" 
SET role = 'admin' 
WHERE email = 'test@gmail.com';
```

Or use Prisma Studio:
```bash
npx prisma studio
```

---

## For Production

When deploying, add to your production environment:

```bash
ADMIN_EMAIL=your-production-email@gmail.com
```

Then run the seed script on production before first login.

---

## Summary

✅ Easy admin setup via `.env`  
✅ Automatic user lookup  
✅ One-command seeding  
✅ Production-ready  

**Run:** `npm run seed` after adding `ADMIN_EMAIL` to `.env`
