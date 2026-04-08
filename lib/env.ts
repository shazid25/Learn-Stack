// import { createEnv } from "@t3-oss/env-nextjs";
// import { z } from "zod";

// export const env = createEnv({
//   server: {
//     DATABASE_URL: z.string().url(),
//     BETTER_AUTH_SECRET: z.string().min(1),
//     BETTER_AUTH_URL : z.string().url(),
//     AUTH_GITHUB_CLIENT_ID : z.string().url().min(1),
//     AUTH_GITHUB_SECRET : z.string().url().min(1),
//   },

//   // For Next.js >= 13.4.4, you only need to destructure client variables:
//   experimental__runtimeEnv: {},
// });

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.string().url(),
    
    // Auth
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    AUTH_GITHUB_CLIENT_ID: z.string().min(1),
    AUTH_GITHUB_SECRET: z.string().min(1),
    AUTH_GOOGLE_CLIENT_ID: z.string().min(1),
    AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
    
    // Services
    RESEND_API_KEY: z.string().min(1),
    FROM_EMAIL: z.string().email(),
    ARCJET_KEY: z.string().min(1),
    
    // Stripe
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    
    // AWS / R2
    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_ENDPOINT_URL_S3: z.string().url(),
    AWS_ENDPOINT_URL_IAM: z.string().url(),
    AWS_REGION: z.string().min(1), 
  },

  client: {
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_AUTH_URL: z.string().url(),
  },

  /**
   * experimental__runtimeEnv is required for the Next.js Edge runtime 
   * and for variables to be available in the browser.
   */
  experimental__runtimeEnv: {
   

    // Client-side (These WILL be available in the browser)
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * z.string().min(1) will then throw an error, which is the desired behavior.
   */
  emptyStringAsUndefined: true,
});