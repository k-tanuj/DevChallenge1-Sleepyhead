import { useState } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';

export default function AICoach() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your local Sleepyhead AI. How can I help you plan your routine today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const sentInput = input;
    setInput('');
    
    try {
      const res = await fetch('http://localhost:8000/api/ai/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: sentInput })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'ai', text: "[Error connecting to local AI service]" }]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-160px)] max-w-4xl mx-auto w-full">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-primary flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">AI Coach</h1>
            <p className="text-sm text-primary flex items-center gap-1 font-medium"><Sparkles className="w-3 h-3" /> Local Model Active</p>
          </div>
        </div>
      </header>

      <div className="flex-1 bg-surface rounded-3xl border border-border/30 flex flex-col overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 z-10">
          
          {messages.map((msg, idx) => (
            msg.sender === 'user' ? (
              <div key={idx} className="flex gap-4 max-w-[85%] self-end">
                 <div className="bg-surface-hover p-4 rounded-2xl rounded-tr-sm text-white text-sm leading-relaxed border border-border/30 shadow-md">
                   {msg.text}
                 </div>
                 <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tanuj" alt="User" className="w-full h-full" />
                 </div>
              </div>
            ) : (
              <div key={idx} className="flex gap-4 max-w-[85%]">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-primary flex items-center justify-center shrink-0">
                   <Bot className="w-4 h-4 text-white" />
                 </div>
                 <div className="bg-background/80 p-5 rounded-2xl rounded-tl-sm text-white/90 text-sm leading-relaxed border border-border/50 shadow-md backdrop-blur-sm whitespace-pre-wrap">
                   {msg.text}
                 </div>
              </div>
            )
          ))}
          
        </div>
        
        {/* Input Area */}
        <div className="p-4 bg-background/80 border-t border-border/50 backdrop-blur-md z-10 flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your routine, plan a study session..." 
            className="flex-1 bg-surface-active border border-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all placeholder:text-text-muted/50"
          />
          <button onClick={handleSend} className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
