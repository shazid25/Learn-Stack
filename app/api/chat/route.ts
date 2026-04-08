import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'), // Extremely fast & free
    system: "You are the Learn-Stack AI assistant. You help students with course questions, coding problems, and LMS navigation. Keep answers concise and helpful.",
    messages,
  });

  return result.toTextStreamResponse();
}