# 🎓 Learn-Stack

> A modern, production-ready Learning Management System with AI-powered features, real-time analytics, and enterprise-grade security.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Learn%20Stack-blue?style=for-the-badge&logo=vercel)](https://learn-stack-bot9.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-shazid25/Learn--Stack-black?style=for-the-badge&logo=github)](https://github.com/shazid25/Learn-Stack)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?style=flat-square&logo=stripe)](https://stripe.com)

---

## 🎯 Overview

**Learn-Stack** is a comprehensive, production-ready Learning Management System designed for educators and course creators. It provides an all-in-one platform for creating, managing, monetizing, and delivering online courses with enterprise-grade features, immersive animations, and AI-powered capabilities.

### Why Learn-Stack?

- ✅ **Production Ready** - Built with industry best practices and modern tech stack
- ✅ **Fully Featured** - Complete ecosystem from authentication to payments to analytics
- ✅ **Scalable Architecture** - Designed to grow from solo creators to enterprise platforms
- ✅ **High-End UX** - Professional animations with Framer Motion and GSAP ScrollTrigger
- ✅ **Developer Friendly** - Clean TypeScript code, comprehensive documentation
- ✅ **Enterprise Security** - Rate limiting, DDoS protection, audit logging
- ✅ **AI-Powered** - Smart analytics, course recommendations, content optimization

---

## ✨ Key Features

### 🎓 Course Management
- **Rich Course Creation** - Create courses with multimedia support (videos, documents, images)
- **Content Organization** - Hierarchical structure (Courses → Chapters → Lessons → Content)
- **Drag-and-Drop Ordering** - Intuitive lesson reordering with dnd-kit
- **Media Management** - Direct AWS S3 integration for assets
- **SEO Optimization** - Auto-generated slugs and metadata
- **Course Status Tracking** - Draft, Published, Archived states
- **Difficulty Levels** - Beginner, Intermediate, Advanced categorization

### 👥 User Management & Authentication
- **Multi-Auth Support** - Email/Password + OAuth (Google, GitHub, Apple)
- **Email Verification** - Automated OTP verification with Resend
- **Session Management** - Secure sessions with IP tracking
- **Role-Based Access** - Admin and Student roles with fine-grained permissions
- **User Banning** - Admin controls with expiration dates
- **Stripe Customer Integration** - Linked billing information

### 💳 Payments & Monetization
- **Stripe Integration** - Full payment processing and subscriptions
- **Per-Course Pricing** - Flexible pricing models
- **Automated Billing** - Automatic product and price creation
- **Webhook Processing** - Real-time payment status updates
- **Enrollment Management** - Track course purchases and access

### 📊 Analytics & Insights
- **Real-Time Dashboard** - Course performance metrics
- **User Analytics** - Enrollment tracking and engagement metrics
- **Lesson Progress Tracking** - Student progress visualization
- **Course Completion Stats** - Detailed completion analytics
- **Revenue Insights** - Payment and subscription analytics

### 🎬 Rich Media & Content
- **Lesson Content Editor** - TipTap rich text editor with advanced formatting
- **File Uploads** - Secure S3 integration for media files
- **Progress Tracking** - Student lesson completion tracking
- **Content Versioning** - Track content changes over time

### 🎨 Immersive User Experience
- **Advanced Animations** - Character reveal text, scroll triggers, magnetic buttons
- **Smooth Scrolling** - Lenis momentum-based scrolling
- **Spring Physics** - Card animations with Framer Motion
- **Responsive Design** - Mobile-first Tailwind CSS layouts
- **Dark Mode** - Built-in theme switching

### 🔒 Security & Performance
- **Arcjet Protection** - DDoS and bot protection
- **Rate Limiting** - API endpoint protection
- **Email Rate Limiting** - Prevent abuse
- **Secure Authentication** - Better-Auth with encryption
- **CORS Configuration** - Restricted API access
- **Input Validation** - Zod schema validation
- **GPU-Accelerated Animations** - 60fps performance

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations with ScrollTrigger
- **React Hook Form** - Form state management
- **TanStack Table** - Data table utilities

### Backend & Database
- **Next.js API Routes** - Serverless backend
- **Prisma ORM** - Database abstraction
- **PostgreSQL** - Primary database (Neon)
- **Zod** - Schema validation

### Authentication & Security
- **Better-Auth** - Modern auth solution
- **Resend** - Email delivery
- **Arcjet** - DDoS and bot protection
- **Next.js Middleware** - Request filtering

### Payments & External Services
- **Stripe** - Payment processing
- **AWS S3** - File storage
- **Next.js Image Optimization** - Image serving

### UI Components & Utilities
- **Radix UI** - Headless UI primitives
- **shadcn/ui** - Pre-built components
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20 LTS)
- pnpm (recommended over npm/yarn)
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shazid25/Learn-Stack.git
cd Learn-Stack
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Update `.env.local` with your credentials:
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

# OAuth
AUTH_GITHUB_CLIENT_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_secret
AUTH_GOOGLE_CLIENT_ID=your_google_client_id
AUTH_GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# Payment
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# File Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=auto
AWS_ENDPOINT_URL_S3=https://t3.storage.dev
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES=your_bucket_name

# Security
ARCJET_KEY=your_arcjet_key

# Admin
ADMIN_EMAIL=admin@yourdomain.com
```

4. **Setup database**
```bash
pnpm prisma migrate dev
```

5. **Seed database (optional)**
```bash
pnpm seed
```

6. **Start development server**
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the app.

---

## 📁 Project Structure

```
Learn-Stack/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes
│   ├── (public)/                 # Public pages
│   ├── admin/                    # Admin dashboard
│   ├── api/                      # API routes
│   ├── dashboard/                # Student dashboard
│   └── layout.tsx                # Root layout
├── components/
│   ├── animations/               # Animation components
│   ├── sidebar/                  # Sidebar components
│   ├── ui/                       # UI primitives
│   └── rich-text-editor/         # Content editor
├── hooks/                        # React hooks
│   ├── useAnimations.ts          # Animation hooks
│   └── ...
├── lib/
│   ├── auth.ts                   # Auth configuration
│   ├── auth-client.ts            # Auth client setup
│   ├── db.ts                     # Database client
│   ├── stripe.ts                 # Stripe client
│   ├── S3Client.ts               # AWS S3 client
│   ├── zodSchemas.ts             # Zod validation schemas
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── public/                       # Static assets
└── package.json                  # Dependencies
```

---

## 🎬 Animation System

Learn-Stack features a professional-grade animation system:

### AnimatedText
Character and word stagger animations for text elements.
```tsx
<AnimatedText variant="words" delay={0.2}>
  Your stunning text here
</AnimatedText>
```

### ScrollReveal
Scroll-triggered reveal animations with blur, scale, and direction options.
```tsx
<ScrollReveal direction="up" scale={true} blur={true}>
  <div>Reveals on scroll</div>
</ScrollReveal>
```

### CardReveal
Spring physics animations for cards with stagger support.
```tsx
{items.map((item, index) => (
  <CardReveal key={index} index={index}>
    <Card>{item}</Card>
  </CardReveal>
))}
```

### LenisScroll
Smooth momentum-based scrolling for the entire application.

📖 **Full Animation Documentation**: See [ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md)

---

## 🔧 Available Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database
pnpm prisma studio   # Open Prisma Studio
pnpm prisma migrate dev   # Create and apply migrations
pnpm prisma generate  # Generate Prisma Client

# Deployment
pnpm build            # Production build
# Deploy to Vercel (automatic on git push)
```

---

## 📊 Database Schema

### Core Models
- **User** - User accounts with authentication
- **Course** - Course information and metadata
- **Chapter** - Course sections
- **Lesson** - Individual lessons within chapters
- **Enrollment** - User course enrollments
- **LessonProgress** - Student lesson completion tracking
- **ProjectSubmission** - Student project submissions
- **Session** - User sessions for authentication
- **Account** - OAuth account links
- **VerificationToken** - Email verification tokens

**See**: [prisma/schema.prisma](./prisma/schema.prisma)

---

## 🔐 Security Features

- ✅ **Rate Limiting** - Arcjet DDoS and rate limit protection
- ✅ **Input Validation** - Zod schema validation on all endpoints
- ✅ **CORS** - Restricted cross-origin requests
- ✅ **Email Rate Limiting** - Prevent email abuse
- ✅ **Session Security** - IP address logging and tracking
- ✅ **Encryption** - Better-Auth handles password encryption
- ✅ **OAuth** - Secure social authentication
- ✅ **Webhook Verification** - Stripe webhook signature validation

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy automatically on push

```bash
# Or using Vercel CLI
vercel deploy
```

### Environment Setup on Vercel
- Add all `.env.local` variables to Vercel project settings
- Ensure DATABASE_URL points to production database
- Verify Stripe webhook is configured for production keys

---

## 📈 Performance Metrics

- **Lighthouse Score**: 90+ (performance, accessibility)
- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **Animation FPS**: Consistent 60fps (GPU-accelerated)
- **Bundle Size**: Optimized with Next.js Turbopack

---

## 🐛 Common Issues & Solutions

### Database Connection Failed
```bash
# Check DATABASE_URL in .env.local
# Verify Neon database is running
# Reset migrations if needed
pnpm prisma migrate reset --force
```

### Prisma Generate Error
```bash
# Remove old config files
rm prisma.config.js prisma.config.ts

# Regenerate
pnpm prisma generate
```

### S3 Upload Failures
```bash
# Verify AWS credentials
# Check bucket name and region
# Ensure CORS is configured on bucket
```

### Stripe Webhook Not Triggering
```bash
# Verify STRIPE_WEBHOOK_SECRET in .env
# Check webhook endpoint URL in Stripe dashboard
# Test with Stripe CLI: stripe listen --forward-to localhost:3000/api/webhook/stripe
```

---

## 📚 Documentation

- [Animation Guide](./ANIMATION_GUIDE.md) - Advanced animation usage
- [Animation System Summary](./ANIMATION_SYSTEM_SUMMARY.md) - Implementation details
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Documentation](https://stripe.com/docs)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is **private**. All rights reserved.

---

## 👤 Author

**Shazid** - [@shazid25](https://github.com/shazid25)

---

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Prisma](https://www.prisma.io) - Database ORM
- [Stripe](https://stripe.com) - Payment processing
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - Component library

---

## 🔗 Links

- **Live Demo**: https://learn-stack-bot9.vercel.app/
- **GitHub Repository**: https://github.com/shazid25/Learn-Stack
- **Report Issues**: https://github.com/shazid25/Learn-Stack/issues

---

<div align="center">

**Made with ❤️ by Shazid**

[⬆ Back to Top](#learn-stack)

</div>
