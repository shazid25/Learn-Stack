"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2, Sparkles, RefreshCcw, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const suggestions = [
  "What courses do you offer?",
  "Tell me about React 19 hooks",
  "How do I contact support?",
  "Are certificates included?"
];

export default function ChatAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  
  // Explicitly destructuring from useChat
  const { 
    messages, 
    sendMessage, 
    status, 
    regenerate,
    error 
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({
      parts: [{ type: "text", text: input }]
    });
    setInput("");
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-0 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center overflow-hidden group"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-[90vw] md:w-[450px] h-[650px] max-h-[80vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-blue-600/10 dark:bg-blue-900/20 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Learn-Stack Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {isLoading ? "AI is thinking..." : "Online"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => regenerate()} type="button" className="p-2 text-slate-400 hover:text-blue-600">
                  <RefreshCcw size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} type="button" className="p-2 text-slate-400 hover:text-red-500">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 && (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <Sparkles className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hello!</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">How can I help you today?</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setInput(s)}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-semibold hover:border-blue-500 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${m.role === "user" ? "bg-slate-100 dark:bg-slate-800" : "bg-blue-600 text-white"}`}>
                    {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`max-w-[85%] p-4 rounded-3xl break-words ${m.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700"}`}>
                    <div className="prose prose-sm dark:prose-invert">
                      {m.parts.map((part, index) => {
                        if (part.type === 'text') {
                          return (
                            <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
                              {part.text}
                            </ReactMarkdown>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center animate-bounce">
                    <Bot size={14} />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none border border-slate-200 dark:border-slate-700">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-30 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}