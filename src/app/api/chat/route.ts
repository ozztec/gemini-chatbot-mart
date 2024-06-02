import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { StreamData, StreamingTextResponse, streamText } from "ai";

const genAI = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const runtime = "edge";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    messages,
  });

  const data = new StreamData();
  data.append({ test: "value" });
  const stream = result.toAIStream({
    onFinal(_) {
      data.close();
    },
  });

  return new StreamingTextResponse(stream, {}, data);
}
