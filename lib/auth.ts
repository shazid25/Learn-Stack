import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { admin, emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    }
  },

  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    },
    google: {
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "Learn-Stack <onboarding@resend.dev>",
          to: email,
          subject: "Verify your Account",
          html: `Your code is: <strong>${otp}</strong>`,
        });
      },
    }),
  ],
  });

  export type Session = typeof auth.$Infer.Session;
  export type User = typeof auth.$Infer.Session.user;