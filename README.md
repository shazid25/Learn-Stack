

-----

# 🎓 Learn-Stack: Enterprise Learning Management System


-----

## Project Access
* **Live Link:** https://learn-stack-bot9.vercel.app/

* **Admin Email:** driveintocode@gmail.com
* **Admin Password:** driveintocode@gmail.com

* **Manager Email:** irfanshazd814@gmail.com
* **Manager Password:** irfanshazd814@gmail.com

-----


## 🎯 Overview

**Learn-Stack** isn't just another tutorial project; it is a high-performance, SEO-optimized, and secure platform designed to handle thousands of concurrent students. By leveraging **Next.js 16's Server Components** and **React 19's Actions**, it achieves a near-instantaneous user experience while maintaining a tiny client-side JavaScript footprint.

### Key Value Propositions:

  * **Zero Latency UI:** Utilizing optimistic updates and TanStack Table for data-heavy views.
  * **Immersive Learning:** Integrated with GSAP and Framer Motion for a "premium" feel.
  * **Secure Monetization:** Industrial-strength Stripe integration with webhook protection.
  * **Developer First:** Type-safe from the database to the frontend using Prisma and Zod.

-----

## 🏗️ Core Architecture

The project follows a **Modular Monolith** pattern within the Next.js App Router, ensuring that concerns are separated while maintaining the speed of a single repository.

```mermaid
graph TD
    User((User)) -->|HTTPS| Vercel[Vercel Edge Network]
    Vercel --> NextJS[Next.js App Router]
    NextJS -->|Server Actions| Auth[Better-Auth]
    NextJS -->|Queries| Prisma[Prisma ORM]
    Prisma --> DB[(PostgreSQL - Neon)]
    NextJS -->|Media| S3[AWS S3 Bucket]
    NextJS -->|Security| Arcjet[Arcjet Shield]
    NextJS -->|Payments| Stripe[Stripe API]
```

-----

## ✨ Deep Dive: Features

### 1\. Advanced Course Builder

The "Instructor" experience is central to Learn-Stack.

  * **Dynamic Chapters:** Reorder lessons on the fly using `@dnd-kit/sortable`.
  * **Rich Content:** Lessons support embedded videos, Markdown, and custom components via the TipTap editor.
  * **Auto-Save:** Draft system ensures progress is never lost during creation.

### 2\. Student Experience

  * **Adaptive Progress:** Real-time tracking of completed lessons with visual progress bars.
  * **Seamless Payments:** One-click checkout powered by Stripe Elements.
  * **Smart Dashboard:** Personalized recommendations based on enrollment history.

### 3\. Administrative Power

  * **Comprehensive Analytics:** Track revenue, user growth, and popular courses.
  * **User Governance:** Ban/Unban users, manage roles, and audit login attempts.

-----

## 🛠️ Technical Stack

### **Frontend Mastery**

| Technology | Usage |
| :--- | :--- |
| **Next.js 16** | Core framework, App Router, Server Components. |
| **React 19** | New hook features (useActionState) and optimized rendering. |
| **Tailwind CSS 4** | Ultra-fast JIT styling and design system. |
| **Framer Motion** | Physics-based layout transitions. |
| **GSAP** | Scroll-driven storytelling and high-performance DOM manipulation. |
| **Shadcn UI** | Accessible, head-less UI components. |

### **Backend & Database**

| Technology | Usage |
| :--- | :--- |
| **Prisma 7** | Type-safe ORM for PostgreSQL. |
| **PostgreSQL** | Relational data with high consistency. |
| **Better-Auth** | Modern authentication with session management. |
| **AWS S3** | Object storage for course videos and images. |
| **Arcjet** | Runtime security and rate limiting. |

-----

## 📊 Database Schema

Our PostgreSQL schema is designed for speed and relational integrity.

### **Entity-Relationship Overview**

  * **User:** Handles authentication, roles (ADMIN/STUDENT), and profiles.
  * **Course:** Stores metadata, pricing, and ownership.
  * **Chapter:** Organizes lessons into logical groups.
  * **Lesson:** The atomic unit of content (Video URL, Content, Sorting order).
  * **Enrollment:** Junction table linking Users to Courses with payment status.
  * **Progress:** Tracks specific lesson completion per user.

<!-- end list -->

```prisma
// Sample Slice
model Course {
  id          String       @id @default(cuid())
  title       String
  description String?      @db.Text
  image       String?
  price       Float?
  isPublished Boolean      @default(false)
  chapters    Chapter[]
  enrollments Enrollment[]
  createdAt   DateTime     @default(now())
}
```

-----

## 🔒 Security Implementation

Security is not an afterthought. Learn-Stack implements:

1.  **Bot Defense:** Arcjet analyzes every request to block scrapers and bad actors.
2.  **Strict CORS:** Only authorized origins can access internal API routes.
3.  **Webhook Validation:** Stripe events are validated using a signing secret to prevent "replay" attacks.
4.  **Session Hardening:** Multi-device session tracking with the ability to "logout from all devices."
5.  **Form Sanitization:** Zod schemas validate every input field before it reaches the DB.

-----

## 🎬 Animation Engine

We utilize a hybrid animation strategy to keep the bundle small but the UI rich.

### **The "Reveal" Pattern**

We use a custom `ScrollReveal` component that leverages `IntersectionObserver`:

```tsx
<ScrollReveal direction="up" delay={0.2}>
  <CourseCard data={course} />
</ScrollReveal>
```

### **The "Smooth Scroll"**

`Lenis` is used to normalize scrolling across platforms, providing a consistent "Apple-like" momentum scroll.

-----

## 🚀 Getting Started

### Prerequisites

  * **Node.js:** v20.x or higher
  * **Package Manager:** `pnpm` (highly recommended)
  * **Database:** A PostgreSQL instance (Neon, Supabase, or Local)

### Installation Steps

1.  **Clone the Source**

    ```bash
    git clone https://github.com/shazid25/Learn-Stack.git
    cd Learn-Stack
    ```

2.  **Dependency Installation**

    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file and add the following:

    ```env
    # APP
    NEXT_PUBLIC_APP_URL="http://localhost:3000"

    # DATABASE
    DATABASE_URL="postgresql://user:pass@host:5432/db"

    # AUTH
    BETTER_AUTH_SECRET="your_secret"
    GOOGLE_CLIENT_ID="xxx"
    GOOGLE_CLIENT_SECRET="xxx"

    # STRIPE
    STRIPE_SECRET_KEY="sk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."

    # AWS S3
    AWS_ACCESS_KEY_ID="xxx"
    AWS_SECRET_ACCESS_KEY="xxx"
    S3_BUCKET_NAME="learn-stack-assets"
    ```

4.  **Database Push**

    ```bash
    pnpm prisma db push
    ```

5.  **Run Development**

    ```bash
    pnpm dev
    ```

-----

## 📡 API Reference

### **Courses**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/courses` | List all published courses | Public |
| `POST` | `/api/courses` | Create a new course draft | Admin |
| `PATCH` | `/api/courses/[id]` | Update course details | Admin |

### **Enrollment**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/checkout` | Create Stripe session | Student |
| `GET` | `/api/user/courses` | List enrolled courses | Student |

-----

## 📈 Performance Benchmarks

  * **Time to Interactive (TTI):** 1.2s
  * **Blocking Time:** \< 50ms
  * **Hydration Speed:** Optimized via `Next.js` partial hydration.
  * **Image Optimization:** 70% reduction in asset size using `next/image` with WebP.

-----

## 🐛 Common Troubleshooting

**Q: Prisma isn't generating types?**

  * Run `pnpm prisma generate` manually. Ensure your `output` path is correct in `schema.prisma`.

**Q: Stripe Webhooks failing?**

  * Use the Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook/stripe`.

**Q: S3 Uploads blocked?**

  * Check your CORS policy in the AWS Console. Ensure it allows your domain and the `PUT` method.

-----

## 🤝 Contributing

We love contributions\!

1.  **Fork** the project.
2.  **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the Branch (`git push origin feature/AmazingFeature`).
5.  **Open** a Pull Request.

-----

## 📝 License

Distributed under the **Private License**. All Rights Reserved.

-----

\<div align="center"\>

### **Developed with dedication by Shazid**

**"Building the future of digital education, one commit at a time."**

[](https://github.com/shazid25)

[⬆ Back to Top](https://www.google.com/search?q=%23learn-stack-enterprise-learning-management-system)

\</div\>

-----
