# 🎓 LearnStack - A Modern Learning Management System

> A comprehensive, production-ready Learning Management System built with cutting-edge technologies. Empower educators to create, manage, and monetize courses with an intuitive, full-featured platform.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square)](https://www.prisma.io)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](#license)

---

## 🎯 Overview

LearnStack is a **comprehensive, scalable learning platform** designed for educators and course creators. It provides a complete ecosystem for building, managing, and monetizing online courses. Whether you're an individual educator or running a large training platform, LearnStack provides all the tools you need.

### 🚀 Why LearnStack?
- **Production Ready** - Built with industry best practices and modern tech stack
- **Fully Featured** - Everything from auth to payments to analytics included
- **Scalable** - Designed to grow from solo creators to enterprise platforms
- **Developer Friendly** - Clean code, TypeScript, and comprehensive architecture
- **Secure** - Enterprise-grade security with rate limiting and DDoS protection

---

## ✨ Core Features

### 🎓 **Course Management**
- Create, edit, and publish courses with rich multimedia support
- Organize content with hierarchical structure (Course → Chapters → Lessons)
- Drag-and-drop lesson ordering with dnd-kit
- Upload course materials, videos, and thumbnails via AWS S3
- SEO-friendly URLs with auto-generated slugs
- Multiple course levels (Beginner, Intermediate, Advanced)
- Course status management (Draft, Published, Archived)

### 👥 **User Management**
- Multi-method authentication (Email/Password + OAuth)
- Social login integration (Google, GitHub, etc.)
- Email verification with Resend
- Role-based access control (Admin, Student)
- User profile management
- Admin-controlled user banning with expiration
- Secure session tracking with IP logging

### 💳 **Payment & Monetization**
- Full Stripe integration for course sales
- Flexible per-course pricing
- Automated product and price creation
- Real-time webhook processing
- Enrollment tracking with status management
- Revenue analytics and reporting
- Payment success/cancellation workflows

### 📊 **Learning Analytics**
- Real-time progress tracking per lesson
- Comprehensive dashboard statistics
- Revenue calculations and metrics
- Enrollment trend analysis
- Student completion rates
- Course performance insights
- Detailed enrollment analytics

### 🎨 **Content & Rich Text Editing**
- TipTap-based rich text editor
- Advanced formatting options (bold, italic, links, etc.)
- Text alignment controls
- HTML rendering for lesson descriptions
- Multimedia content embedding
- Lesson description management

### 🛡️ **Security & Performance**
- Arcjet integration for DDoS protection
- Rate limiting on critical API routes
- Bot detection
- Secure presigned URLs for file uploads
- CSRF protection (built-in Next.js)
- Input validation with Zod schemas
- Environment variable encryption

### 📱 **User Experience**
- Responsive, mobile-first design
- Dark mode support
- Interactive course discovery
- Intuitive learning dashboard
- Progress visualization
- Accessibility-first with Radix UI (WCAG 2.1)

---

## 🏗️ Architecture & Tech Stack

### Core Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 | React meta-framework with SSR/SSG |
| **Language** | TypeScript | Type-safe development |
| **Database** | PostgreSQL + Prisma | Relational database with modern ORM |
| **Authentication** | Better Auth | Secure auth with OAuth support |
| **Styling** | TailwindCSS + Radix UI | Utility-first CSS with accessible components |
| **UI Components** | shadcn/ui | Pre-built, customizable components |
| **Payment** | Stripe | Complete payment processing |
| **File Storage** | AWS S3 | Scalable cloud storage |
| **Email** | Resend | Transactional emails |
| **Security** | Arcjet | DDoS protection & rate limiting |
| **Rich Text** | TipTap | Advanced text editing |
| **Drag & Drop** | dnd-kit | Performant drag-and-drop |
| **Icons** | Tabler Icons | Clean, consistent icons |
| **Data Tables** | TanStack Table | Powerful table component |
| **Validation** | Zod | Runtime type checking |

### Project Structure

```
learn-stack/
├── 📱 app/                              # Next.js App Router
│   ├── api/
│   │   ├── auth/[...all]/              # Better Auth endpoints
│   │   ├── s3/
│   │   │   ├── upload/                 # File upload handling
│   │   │   └── delete/                 # File deletion
│   │   └── webhook/stripe/             # Payment webhooks
│   ├── (auth)/                         # Auth layout group
│   │   ├── login/page.tsx              # Login page
│   │   └── verify-request/page.tsx     # Email verification
│   ├── (public)/                       # Public layout group
│   │   ├── page.tsx                    # Landing page
│   │   ├── courses/page.tsx            # Courses listing
│   │   ├── courses/[slug]/             # Course details
│   │   └── _components/                # Public components
│   ├── admin/                          # Admin routes
│   │   ├── page.tsx                    # Admin dashboard
│   │   ├── courses/page.tsx            # Course management
│   │   ├── courses/create/             # Course creation
│   │   └── courses/[courseId]/         # Course editor
│   ├── dashboard/                      # Student dashboard
│   │   ├── page.tsx                    # Dashboard home
│   │   ├── [slug]/page.tsx             # Course view
│   │   └── [slug]/[lessonId]/page.tsx  # Lesson view
│   ├── payment/                        # Payment routes
│   │   ├── success/page.tsx            # Payment success
│   │   └── cancel/page.tsx             # Payment cancel
│   ├── data/                           # Server actions & queries
│   │   ├── admin/                      # Admin data functions
│   │   ├── course/                     # Course queries
│   │   └── user/                       # User queries
│   └── not-admin/page.tsx              # Access denied page
├── 🧩 components/                      # Reusable components
│   ├── ui/                             # shadcn/ui components
│   ├── sidebar/                        # Layout components
│   ├── rich-text-editor/               # TipTap editor
│   └── file-uploader/                  # S3 upload UI
├── ⚙️ lib/                              # Core utilities
│   ├── auth.ts                         # Authentication setup
│   ├── db.ts                           # Prisma client
│   ├── S3Client.ts                     # AWS S3 configuration
│   ├── stripe.ts                       # Stripe setup
│   ├── resend.ts                       # Email configuration
│   ├── arcjet.ts                       # Rate limiting setup
│   ├── utils.ts                        # Helper utilities
│   ├── types.ts                        # TypeScript types
│   ├── zodSchemas.ts                   # Validation schemas
│   └── generated/prisma/               # Generated Prisma client
├── 🎣 hooks/                           # Custom React hooks
│   ├── use-course-progress.ts
│   ├── use-mobile.ts
│   ├── use-signout.ts
│   └── use-construct-url.ts
├── 📚 prisma/
│   └── schema.prisma                   # Database schema definition
├── 📄 public/                          # Static assets
├── tsconfig.json                       # TypeScript configuration
├── next.config.ts                      # Next.js configuration
├── tailwind.config.ts                  # TailwindCSS configuration
└── package.json                        # Project dependencies
```

---

## 🔧 Database Schema

LearnStack uses a comprehensive Prisma schema with well-designed relational models:

### Core Models

**User**
- User profiles with authentication
- Role-based access (admin/student)
- Ban management with expiration
- Stripe customer integration
- Sessions and OAuth accounts

**Course**
- Complete course metadata
- Pricing and Stripe integration
- Status management (draft/published/archived)
- Category and difficulty level
- SEO-friendly slugs

**Chapter & Lesson**
- Hierarchical content structure
- Position-based ordering
- Multimedia support (videos, thumbnails)
- Description and metadata
- AWS S3 file storage

**Enrollment**
- Purchase tracking
- Status management (Pending/Active/Cancelled)
- Amount recording
- Unique constraints per user-course

**LessonProgress**
- User completion tracking
- Completion timestamps
- Progress aggregation

**Session & Account**
- Secure session management
- OAuth provider integration
- Token management
- IP and user agent logging

---

## 📦 Dependencies Overview

### Essential Dependencies
```json
{
  "next": "^15.x",                    // React framework with App Router
  "@prisma/client": "^6.11.1",        // Database ORM
  "better-auth": "^1.2.12",           // Authentication system
  "stripe": "latest",                 // Payment processing
  "@aws-sdk/client-s3": "^3.850.0",   // AWS S3 integration
  "resend": "latest",                 // Email service
  "@arcjet/next": "^1.0.0-beta.9"    // DDoS protection
}
```

### UI & Components
- `tailwindcss` - Utility-first CSS framework
- `@radix-ui/*` - Accessible component primitives
- `shadcn/ui` - Pre-built component library
- `@tabler/icons-react` - Icon library
- `canvas-confetti` - Celebration animations

### Data Management
- `@hookform/resolvers` - Form validation integration
- `@tanstack/react-table` - Advanced data tables
- `zod` - TypeScript-first schema validation
- `date-fns` - Date utilities

### Content & Rich Text
- `@tiptap/*` - Rich text editor
- `@dnd-kit/*` - Drag-and-drop utilities

### Development
- `typescript` - Type safety
- `eslint` - Code linting
- `prettier` - Code formatting

See `package.json` for complete dependency list and versions.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or higher
- **PostgreSQL** 12+ (local or remote)
- **pnpm**, **npm**, or **yarn** package manager
- AWS S3 account with credentials
- Stripe account
- Resend API key

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/shazid25/learn-stack.git
cd learn-stack
```

#### 2. Install Dependencies
```bash
pnpm install
# or: npm install / yarn install
```

#### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/learnstack"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-generate-with-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# AWS S3
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
AWS_S3_BUCKET_NAME="your-s3-bucket-name"
AWS_REGION="us-east-1"

# Email Service (Resend)
RESEND_API_KEY="re_xxx..."

# OAuth Providers (Optional)
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
GOOGLE_ID="your-google-oauth-id"
GOOGLE_SECRET="your-google-oauth-secret"
```

#### 4. Setup Database

```bash
# Run Prisma migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate

# (Optional) Seed database with sample data
pnpm prisma db seed
```

#### 5. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser. The app will auto-reload as you make changes with Turbopack!

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack (fast!) |
| `pnpm build` | Build optimized production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint code checks |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `prisma generate` | Generate Prisma client types |
| `prisma migrate dev` | Create and apply database migrations |
| `prisma studio` | Open visual database management GUI |
| `prisma db seed` | Seed database with sample data |

---

## 🔐 Security Features

### Built-in Protections

✅ **Secure Authentication**
- Better Auth with encrypted sessions
- OAuth 2.0 provider support
- Email verification workflow
- Secure password hashing

✅ **Rate Limiting & DDoS Protection**
- Arcjet integration on critical endpoints
- Per-IP rate limiting
- Bot detection
- Configurable thresholds

✅ **File Upload Security**
- Presigned URLs for S3 uploads
- File type validation
- Size limits
- Secure deletion

✅ **Data Protection**
- Input validation with Zod schemas
- CSRF protection (built-in Next.js)
- SQL injection prevention (Prisma ORM)
- XSS protection

✅ **API Security**
- Authorization checks on admin endpoints
- Session token validation
- Webhook signature verification
- Stripe event validation

### Best Practices Implemented
- Session token rotation
- IP address and user agent logging
- Secure environment variable handling
- Database-level constraints
- Index optimization for performance

---

## 🎨 Features in Detail

### For Educators

📝 **Course Creation**
- Intuitive course builder
- Support for multiple chapters and lessons
- Multimedia content uploads
- Rich text editing for descriptions
- SEO optimization

📊 **Analytics & Management**
- View course enrollments
- Track revenue and earnings
- Monitor student progress
- See completion rates
- Manage course status

💰 **Monetization**
- Set flexible course pricing
- Automatic Stripe integration
- Track earnings in real-time
- Manage course availability

### For Students

🎓 **Learning Experience**
- Browse available courses
- View course previews and curricula
- Seamless purchase experience
- Structured learning path
- Progress tracking

📚 **Dashboard**
- View all enrolled courses
- Continue where you left off
- Track completion progress
- Access course materials

✅ **Progress Tracking**
- Mark lessons as complete
- Visual progress indicators
- Completion certificates
- Achievement tracking

---

## 🎯 40+ Major Implementation Tasks Completed

### Phase 1: Foundation & Authentication (Tasks 1-11)

1. **Authentication System Setup** - Better Auth integration with OAuth providers
2. **Database Schema Design** - Comprehensive Prisma schema with all models
3. **User Model Implementation** - Authentication, roles, and ban management
4. **Session Management** - Secure session tracking and impersonation
5. **Course Model Architecture** - Complete course metadata and pricing
6. **Chapter & Lesson Structure** - Hierarchical content organization
7. **Enrollment System** - Purchase tracking and status management
8. **Lesson Progress Tracking** - User completion tracking
9. **Verification & Account Models** - OAuth and email verification
10. **API Route Structure** - RESTful API architecture
11. **Authentication Routes** - Better Auth endpoint configuration

### Phase 2: File Management & Payments (Tasks 12-14)

12. **S3 File Upload Integration** - Presigned URLs and secure uploads
13. **S3 File Deletion** - File cleanup with authorization
14. **Stripe Webhook Integration** - Payment event processing

### Phase 3: Admin Features (Tasks 15-22)

15. **Admin Dashboard Layout** - Navigation and layout setup
16. **Admin Courses Management** - Course CRUD operations
17. **Admin Course Creation** - Automated Stripe integration
18. **Admin Course Details** - Chapter and lesson management
19. **Data Fetching: Admin Course Query** - Single course retrieval
20. **Data Fetching: Admin Courses List** - Paginated course listing
21. **Data Fetching: Dashboard Statistics** - Revenue and metrics
22. **Data Fetching: Enrollment Statistics** - Analytics and trends

### Phase 4: Public & Student Features (Tasks 23-38)

23. **Public Landing Page** - Course discovery marketing
24. **Public Courses Listing** - Browsable course catalog
25. **Public Course Details** - Course preview pages
26. **Navbar Component** - Navigation and search
27. **User Dropdown Menu** - Profile and settings access
28. **Public Course Card** - Reusable course display
29. **Student Dashboard** - Personalized learning hub
30. **Dashboard Course List** - Enrolled courses view
31. **Course Sidebar** - Lesson navigation
32. **Course Progress Card** - Progress visualization
33. **Lesson Item Component** - Lesson display and video
34. **Course Payment Flow** - Stripe checkout
35. **Payment Success Page** - Confirmation and redirect
36. **Payment Cancellation** - Retry options
37. **Login & Authentication UI** - Form and social login
38. **Email Verification Page** - Verification workflow

### Phase 5: Content & Security (Tasks 39-40+)

39. **Rich Text Editor** - TipTap-based content editing
40. **Security & Rate Limiting** - Arcjet integration
41-40+. **Additional Features** - Drag-and-drop, file uploads, analytics

---

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/shazid25/learn-stack.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Commit Your Changes**
   ```bash
   git commit -m 'Add AmazingFeature'
   ```

5. **Push to Your Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Link related issues
   - Request reviews

### Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Write comments for complex logic
- Test thoroughly before submitting

---

## 📄 License

This project is **private**. All rights reserved. 

⚠️ **Unauthorized copying, distribution, or modification of this code is strictly prohibited.**

---

## 🙏 Acknowledgments

We're grateful to the amazing open-source community:

- [Next.js](https://nextjs.org) - Excellent React framework and documentation
- [Prisma](https://www.prisma.io) - Modern ORM with amazing developer experience
- [Stripe](https://stripe.com) - Reliable payment infrastructure
- [shadcn/ui](https://ui.shadcn.com) - Beautiful and accessible components
- [TipTap](https://tiptap.dev) - Powerful rich text editor
- [Radix UI](https://www.radix-ui.com) - Accessible component primitives
- [dnd-kit](https://docs.dndkit.com) - Modern drag-and-drop solution
- [Arcjet](https://arcjet.com) - Security and rate limiting
- [Resend](https://resend.com) - Email infrastructure
- [AWS](https://aws.amazon.com) - Cloud services

---

## 👨‍💻 Author

**Shazid**
- GitHub: [@shazid25](https://github.com/shazid25)
- Project: [LearnStack on GitHub](https://github.com/shazid25/learn-stack)

---

## 📞 Support & Contact

- 📧 **Issues** - Open an issue on [GitHub](https://github.com/shazid25/learn-stack/issues)
- 💬 **Discussions** - Join community discussions
- 🐛 **Bug Reports** - Report bugs with reproduction steps
- 💡 **Feature Requests** - Suggest new features

---

## 🗺️ Roadmap

### Planned Features
- [ ] Course certificates on completion
- [ ] Advanced progress analytics
- [ ] Bulk student upload
- [ ] Email marketing integration
- [ ] Student discussion forums
- [ ] Course ratings and reviews
- [ ] Affiliate system
- [ ] Advanced course filtering
- [ ] Course bundles
- [ ] Instructor revenue reports

---

## 📊 Project Stats

- **40+** Major features implemented
- **100%** Type-safe with TypeScript
- **Enterprise-grade** Security and performance
- **Fully responsive** Mobile-first design
- **Production-ready** Best practices throughout

---

**Last Updated**: March 2026 | **Status**: ✨ Active Development

---

<div align="center">

### 🌟 If you find LearnStack helpful, please give it a star!

**Built with ❤️ for educators and learners worldwide**

</div>
#   L e a r n - S t a c k 
 
 

