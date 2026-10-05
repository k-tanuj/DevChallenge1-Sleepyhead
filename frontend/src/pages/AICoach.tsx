import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AICoach() {
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
          
          <div className="flex gap-4 max-w-[85%] self-end">
             <div className="bg-surface-hover p-4 rounded-2xl rounded-tr-sm text-white text-sm leading-relaxed border border-border/30 shadow-md">
               I have 3 chapters left and it is 11:30 PM. Should I keep going?
             </div>
             <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tanuj" alt="User" className="w-full h-full" />
             </div>
          </div>

          <div className="flex gap-4 max-w-[85%]">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-primary flex items-center justify-center shrink-0">
               <Bot className="w-4 h-4 text-white" />
             </div>
             <div className="bg-background/80 p-5 rounded-2xl rounded-tl-sm text-white/90 text-sm leading-relaxed border border-border/50 shadow-md backdrop-blur-sm">
               <p className="mb-3">You've already completed 90 minutes of study today. Based on your recent routine, pushing another 2 hours would likely interfere with tomorrow's schedule and break your 12-day streak.</p>
               <p className="mb-4">I'd recommend:</p>
               <ul className="list-disc pl-5 mb-4 space-y-1 text-white">
                 <li><span className="font-semibold text-primary">20 mins:</span> review the highest-priority section</li>
                 <li><span className="font-semibold text-primary">Stop:</span> strictly at midnight</li>
                 <li><span className="font-semibold text-primary">Finish:</span> the rest tomorrow between 7:30 PM–8:30 PM</li>
               </ul>
               <p className="text-text-muted italic">I've adjusted tomorrow's challenge accordingly.</p>
               
               <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                 <button className="px-3 py-1.5 bg-surface text-primary text-xs font-bold rounded-lg border border-primary/30 hover:bg-primary/10 transition-colors">Plan Tomorrow</button>
                 <button className="px-3 py-1.5 bg-surface text-white text-xs font-medium rounded-lg border border-border hover:bg-surface-hover transition-colors">Prepare for Exam</button>
               </div>
             </div>
          </div>
          
        </div>
        
        {/* Input Area */}
        <div className="p-4 bg-background/80 border-t border-border/50 backdrop-blur-md z-10 flex gap-3">
          <input 
            type="text" 
            placeholder="Ask about your routine, plan a study session..." 
            className="flex-1 bg-surface-active border border-border rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all placeholder:text-text-muted/50"
          />
          <button className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
