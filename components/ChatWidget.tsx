import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareCode, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: MessageRole.MODEL, 
      text: "Hello! I am Laksh's AI assistant. Feel free to ask me anything about his qualifications, technical project achievements, B.E. CGPA, certifications, or how to reach him!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: MessageRole.USER, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input, messages);
    
    setMessages(prev => [...prev, { role: MessageRole.MODEL, text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[520px] bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/80 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right scale-100">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 px-5 py-4 flex justify-between items-center text-white border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Bot size={18} />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wide text-white block">Portfolio Assistant</span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online & Active
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-slate-800 p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/60 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === MessageRole.USER 
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/10' 
                      : 'bg-slate-900 text-slate-100 shadow-lg border border-slate-800/80 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase font-mono tracking-wider">
                    {msg.role === MessageRole.USER ? (
                      <>
                        <User size={10} className="text-indigo-200" />
                        <span className="text-indigo-200 font-bold">You</span>
                      </>
                    ) : (
                      <>
                        <Bot size={10} className="text-indigo-400" />
                        <span className="text-indigo-400 font-bold">AI Assistant</span>
                      </>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-slate-900 text-slate-200 border border-slate-800/80 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1.5 text-[10px] uppercase font-mono tracking-wider text-indigo-400">
                      <Sparkles size={10} className="animate-spin" />
                      <span>Thinking...</span>
                    </div>
                    <div className="flex gap-1 py-1 px-1">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Laksh's resume details..."
                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-100 placeholder-slate-500"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0 border border-indigo-400/20 shadow-lg shadow-indigo-600/20"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="transition-all duration-300 transform hover:scale-110 active:scale-95 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-2xl shadow-xl hover:shadow-indigo-600/30 flex items-center justify-center border border-indigo-400/30 relative group"
        title="Ask Assistant"
      >
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
        <MessageSquareCode size={24} />
      </button>
    </div>
  );
};
