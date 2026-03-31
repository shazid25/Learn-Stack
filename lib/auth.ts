
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { admin, emailOTP } from "better-auth/plugins"
import { resend } from "./resend";
import type { User } from "./generated/prisma"


export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignInAfterSignUp: true,
    minPasswordLength: 6,
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
  callbacks: {
    async signInUser({ user }: { user: User }) {
      // Auto-verify email for all users
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });
      return user;
    },
    async afterSignUpUser({ user }: { user: User }) {
      // Auto-verify email after signup
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      });
      return user;
    },
  },
  plugins: [
    admin(),
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Your OTP Code",
          html: `Your verification code is: <strong>${otp}</strong>`,
        });
      },
    }),
  ],
});
