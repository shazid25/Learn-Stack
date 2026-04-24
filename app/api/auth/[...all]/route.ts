import arcjet from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import ip from "@arcjet/ip";
import {
  type ArcjetDecision,
  type BotOptions,
  type SlidingWindowRateLimitOptions,
  detectBot,
  slidingWindow,
} from "@arcjet/next";

import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

const botOptions = {
  mode: "LIVE",
  // configured with a list of bots to allow from
  // https://arcjet.com/bot-list
  allow: [], // prevents bots from submitting the form
} satisfies BotOptions;

const rateLimitOptions = {
  mode: "LIVE",
  interval: "2m", // counts requests over a 2 minute sliding window
  max: 5, // allows 5 submissions within the window
} satisfies SlidingWindowRateLimitOptions<[]>;

async function protect(req: NextRequest): Promise<ArcjetDecision> {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  // If the user is logged in we'll use their ID as the identifier. This
  // allows limits to be applied across all devices and sessions (you could
  // also use the session ID). Otherwise, fall back to the IP address.
  let userId: string;
  if (session?.user.id) {
    userId = session.user.id;
  } else {
    userId = ip(req) || "127.0.0.1"; // Fall back to local IP if none
  }

  // If this is a signup then use the special protectSignup rule
  // See https://docs.arcjet.com/signup-protection/quick-start
  if (req.nextUrl.pathname.startsWith("/api/auth/sign-up")) {
    // For signup, just use bot detection and rate limiting
    // Skip email validation to avoid false positives
    return arcjet
      .withRule(detectBot(botOptions))
      .withRule(slidingWindow(rateLimitOptions))
      .protect(req, { fingerprint: userId });
  } else {
    // For all other auth requests
    return arcjet
      .withRule(detectBot(botOptions))
      .protect(req, { fingerprint: userId });
  }
}

const authHandlers = toNextJsHandler(auth.handler);

export const { GET } = authHandlers;

// Wrap the POST handler with Arcjet protections
export const POST = async (req: NextRequest) => {
  try {
    const decision = await protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        console.error("Rate limit exceeded");
        return new Response(null, { status: 429 });
      } else if (decision.reason.isEmail()) {
        let message: string;

        if (decision.reason.emailTypes.includes("INVALID")) {
          message = "Email address format is invalid. Is there a typo?";
        } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
          message = "We do not allow disposable email addresses.";
        } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
          message =
            "Your email domain does not have an MX record. Is there a typo?";
        } else {
          message = "Invalid email.";
        }

        console.error("Email validation failed:", message);
        return Response.json({ message }, { status: 400 });
      } else {
        console.error("Arcjet denied:", decision.reason);
        return new Response(null, { status: 403 });
      }
    }

    return authHandlers.POST(req);
  } catch (error) {
    console.error("Auth POST Error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
