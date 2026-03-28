# Prisma Configuration Migration Guide

## What Changed?

Prisma v7+ has moved away from storing database connection URLs directly in `schema.prisma`. This change improves security and configuration management.

## Changes Made

### 1. ✅ Created `prisma.config.ts`
This new file handles the datasource configuration:

```typescript
// prisma.config.ts
export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};
```

**Purpose**: Centralized configuration for database connection URLs

### 2. ✅ Updated `prisma/schema.prisma`
Removed the `url` property from the datasource:

```prisma
// Before
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  ❌ Removed
}

// After
datasource db {
  provider = "postgresql"
}
```

**Why**: Schema file now only defines the provider, not the connection URL

### 3. ✅ Updated `lib/db.ts`
Added `datasourceUrl` to the PrismaClient constructor:

```typescript
// Before
export const prisma = globalForPrisma.prisma || new PrismaClient();

// After
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });
```

**Why**: Passes the connection URL to PrismaClient at runtime

---

## How It Works

1. **`prisma.config.ts`** → Stores datasource configuration
2. **`prisma/schema.prisma`** → Defines the schema structure (provider only)
3. **`lib/db.ts`** → Uses `datasourceUrl` in PrismaClient constructor
4. **`.env`** → Stores `DATABASE_URL` environment variable

---

## Verification

Run these commands to verify everything is working:

```bash
# Regenerate Prisma Client
npx prisma generate

# Check database connection
npx prisma db push

# Open Prisma Studio (optional)
npx prisma studio
```

---

## What You Need to Do

✅ **Already Fixed!** All changes have been applied automatically.

Just make sure:
- [ ] `.env` file has `DATABASE_URL` configured
- [ ] Run `npm install` or `pnpm install` if needed
- [ ] Run `npx prisma generate` to regenerate the client
- [ ] Test by running `npm run dev`

---

## Benefits

✨ **Improved Security**: Connection URLs no longer in schema files  
✨ **Better Configuration**: Separate config file for datasources  
✨ **Future Proof**: Compatible with Prisma v7+  
✨ **Cleaner Schema**: Schema file focuses on data modeling only  

---

## References

- 📚 [Prisma Config Documentation](https://pris.ly/d/config-datasource)
- 📚 [PrismaClient Config](https://pris.ly/d/prisma7-client-config)
