
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { admin } from "better-auth/plugins"
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
  },
  plugins: [
    admin(),
  ],
});
