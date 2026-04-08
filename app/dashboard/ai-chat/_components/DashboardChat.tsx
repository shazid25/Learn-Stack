"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, Loader2, Sparkles, RefreshCcw, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const suggestions = [
  "What courses do you offer?",
  "Tell me about React 19 hooks",
  "How do I contact support?",
  "Are certificates included?"
];

export default function DashboardChat() {
  const [input, setInput] = useState("");
  
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
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-blue-600/10 dark:bg-blue-900/20 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Learn-Stack AI Assistant</h3>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {isLoading ? "AI is thinking..." : "Online & ready to help"}
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => regenerate()} 
          type="button" 
          className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
          title="Regenerate last response"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-slate-900/30">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto space-y-8 py-12">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-3xl bg-blue-600/10 text-blue-600 mb-2">
                <Sparkles size={32} />
              </div>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white">How can I help you today?</h4>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Ask me about our courses, curriculum, or help with your coding projects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInput(s)}
                  className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-left hover:border-blue-500 hover:shadow-md transition-all group flex items-center justify-between"
                >
                  <span className="text-slate-700 dark:text-slate-300">{s}</span>
                  <Send size={14} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto w-full space-y-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${m.role === "user" ? "bg-white dark:bg-slate-800" : "bg-blue-600 text-white"}`}>
                {m.role === "user" ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`max-w-[85%] p-5 rounded-[2rem] break-words shadow-sm ${m.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700"}`}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
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
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center animate-pulse">
                <Bot size={18} />
              </div>
              <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white shadow-inner"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-3 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-30 transition-all shadow-lg shadow-blue-600/20"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-widest">
          Powered by Gemini 1.5 Flash • Learn-Stack AI
        </p>
      </div>
    </div>
  );
}
