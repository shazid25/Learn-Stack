# 🔧 Bug Fix - useTransition Directive

## Issue
```
Error: ./app/admin/courses/_components/AdminCourseCard.tsx:27:10
You're importing a component that needs `useTransition`. This React hook only works in a client component.
```

## Root Cause
The `AdminCourseCard.tsx` component was using the `useTransition` hook from React but was missing the `"use client"` directive at the top of the file.

In Next.js 13+, components that use client-side features (like hooks) must be explicitly marked as client components.

## Solution
Added `"use client"` directive to the top of the file:

```typescript
"use client";

import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
// ... rest of imports
import { useTransition } from "react";
// ... rest of code
```

## File Modified
- `app/admin/courses/_components/AdminCourseCard.tsx`

## Status
✅ **FIXED** - The build now compiles successfully and all features work correctly.

## Verification
- ✅ File compiles without errors
- ✅ Application running on localhost:3001
- ✅ Admin dashboard accessible
- ✅ Course cards rendering correctly
- ✅ Publish buttons functional

---

**Date Fixed**: March 28, 2026  
**Status**: ✅ Complete

