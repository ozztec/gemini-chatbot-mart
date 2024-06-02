"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { Spinner } from "./Spinner";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
    });

  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>
          Chatbot using Vercel SDK and Gemini model.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="md:h-[300px] h-[200px] w-full pr-4">
          {messages.length <= 0 && (
            <div>
              <p className="text-slate-800 text-sm">No messages yet.</p>
            </div>
          )}
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className="flex gap-2 text-slate-800 text-sm mb-4"
              >
                {message.role === "user" ? (
                  <Avatar>
                    <AvatarFallback>Y</AvatarFallback>
                    <AvatarImage src="https://github.com/wfabi0.png" />
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarFallback>GM</AvatarFallback>
                    <AvatarImage src="https://github.com/google-gemini.png" />
                  </Avatar>
                )}
                <p className="leading-relaxed">
                  <span className="block font-semibold">
                    {message.role === "user" ? "User" : "Gemini"}:
                  </span>
                  {isLoading &&
                  message.role === "assistant" &&
                  message === messages[messages.length - 1] ? (
                    Date.now() - Number(message.createdAt) < 5000 ? (
                      <Spinner />
                    ) : (
                      message.content
                    )
                  ) : (
                    message.content
                  )}
                </p>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
          <Input
            value={input}
            placeholder="Send a message."
            onChange={handleInputChange}
          />
          <Button disabled={isLoading} type="submit">
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
