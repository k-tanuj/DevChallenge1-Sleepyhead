import { MessageCircle, Moon, BookOpen, Sunrise } from 'lucide-react';

export default function RightSidebar() {
  const activeChallenges = [
    { id: 1, title: 'Sleep Before 11:45 PM', progress: '4/7', color: 'bg-green-500', icon: <Moon className="w-6 h-6 text-green-500" /> },
    { id: 2, title: 'Focused study session', progress: '3/5', color: 'bg-blue-500', icon: <BookOpen className="w-6 h-6 text-blue-500" /> },
    { id: 3, title: 'Wake target window', progress: '5/7', color: 'bg-yellow-500', icon: <Sunrise className="w-6 h-6 text-yellow-500" /> },
  ];

  return (
    <aside className="w-20 lg:w-72 border-l border-border/30 bg-surface/30 flex flex-col py-8 px-4 h-full hidden md:flex">
      {/* Top Profile */}
      <div className="flex items-center justify-center lg:justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tanuj" alt="Tanuj" className="w-full h-full object-cover" />
          </div>
          <div className="hidden lg:block">
            <h3 className="text-white font-medium text-sm">Tanuj</h3>
            <p className="text-primary text-xs font-semibold">Level 8 (820 XP)</p>
          </div>
        </div>
      </div>
      
      {/* Active Challenges List (like Friends list in Image 1) */}
      <div className="flex-1 flex flex-col items-center lg:items-start gap-4">
        <div className="hidden lg:flex items-center gap-2 mb-2 w-full">
          <div className="h-6 w-6 rounded-full bg-surface-hover flex items-center justify-center">
            <Target className="w-3 h-3 text-text-muted" />
          </div>
          <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Active Challenges</span>
        </div>
        
        {activeChallenges.map(challenge => (
          <div key={challenge.id} className="w-12 h-12 lg:w-full lg:h-auto lg:p-2 rounded-full lg:rounded-xl bg-surface hover:bg-surface-hover transition-colors flex items-center gap-3 cursor-pointer relative lg:static">
            <div className="w-12 h-12 rounded-full bg-surface-active flex items-center justify-center text-xl relative shrink-0">
              {challenge.icon}
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface ${challenge.color}`}></div>
            </div>
            <div className="hidden lg:block flex-1 overflow-hidden">
              <h4 className="text-sm font-medium text-white truncate">{challenge.title}</h4>
              <p className="text-xs text-text-muted">{challenge.progress} completed</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Messages / AI Coach quick access */}
      <div className="mt-auto flex flex-col items-center lg:items-start gap-4 pt-6 border-t border-border/30">
        <div className="w-12 h-12 lg:w-full lg:h-auto lg:p-2 rounded-full lg:rounded-xl bg-surface hover:bg-surface-hover transition-colors flex items-center gap-3 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary relative shrink-0">
            <MessageCircle className="w-5 h-5" />
            <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-primary border-2 border-surface"></div>
          </div>
          <div className="hidden lg:block">
            <h4 className="text-sm font-medium text-white">AI Coach</h4>
            <p className="text-xs text-text-muted">1 new insight</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Quick target icon
function Target(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
