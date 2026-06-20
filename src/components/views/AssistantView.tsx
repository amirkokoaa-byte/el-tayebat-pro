import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export function AssistantView() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'model',
    text: 'أهلاً بك! أنا المساعد الذكي لنظام الطيبات. تفضل، كيف يمكنني مساعدتك اليوم بخصوص تفاصيل، أعراض، أو بروتوكولات النظام؟'
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');
    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.map(m => ({ role: m.role, text: m.text }))
         })
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Invalid response format");
      }
      
      if (response.ok) {
        setMessages([...newMessages, { role: 'model', text: data.text }]);
      } else {
        setMessages([...newMessages, { role: 'model', text: "عذراً، حدث خطأ أثناء الاتصال بالخادم. حاول مجدداً." }]);
      }
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'model', text: "عذراً، حدث خطأ في الاتصال." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-in fade-in zoom-in duration-500">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 p-4 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl text-white">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-100">المساعد الذكي (خبير الطيبات)</h2>
          <p className="text-xs text-slate-400 mt-0.5">اسألني أي شيء عن المسموحات والممنوعات والأعراض.</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-blue-300'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tl-none' : 'bg-slate-700 text-slate-200 border border-slate-600 rounded-tr-none'}`}>
              <div className="markdown-body prose prose-invert prose-sm max-w-none">
                <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
              </div>
            </div>

          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 bg-slate-700 text-blue-300">
              <Bot size={16} />
            </div>
            <div className="bg-slate-700 text-slate-200 border border-slate-600 p-4 rounded-2xl rounded-tr-none flex gap-1">
               <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
               <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
               <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900 border-t border-slate-700 flex gap-2">
        <input 
          type="text" 
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="اكتب سؤالك هنا..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <Send size={20} className="mr-1 transform rotate-180" />
        </button>
      </div>

    </div>
  );
}
