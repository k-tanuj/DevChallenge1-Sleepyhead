import { useState, useEffect } from 'react';
import { MessageCircle, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RightSidebar() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [challenges, setChallenges] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://devchallenge1-sleepyhead.onrender.com/api/dashboard')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
      
    fetch('https://devchallenge1-sleepyhead.onrender.com/api/challenges')
      .then(r => r.json())
      .then(data => {
        const active = data.filter((c: any) => c.status === 'Active').slice(0, 3);
        setChallenges(active);
      })
      .catch(console.error);
  }, []);

  return (
    <aside className="w-20 lg:w-72 border-l border-border/30 bg-surface/30 flex flex-col py-8 px-4 h-full hidden md:flex">
      {/* Top Profile */}
      <div className="flex items-center justify-center lg:justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tanuj" alt="Tanuj" className="w-full h-full object-cover" />
          </div>
          <div className="hidden lg:block">
            <h3 className="text-white font-medium text-sm">{data?.user?.name || "Tanuj"}</h3>
            <p className="text-primary text-xs font-semibold">Level {data?.user?.level || 8} ({data?.user?.xp || 820} XP)</p>
          </div>
        </div>
      </div>
      
      {/* Active Challenges List */}
      <div className="flex-1 flex flex-col items-center lg:items-start gap-4">
        <div className="hidden lg:flex items-center gap-2 mb-2 w-full">
          <div className="h-6 w-6 rounded-full bg-surface-hover flex items-center justify-center">
            <Target className="w-3 h-3 text-text-muted" />
          </div>
          <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Active Challenges</span>
        </div>
        
        {challenges.map((challenge, idx) => {
          const color = idx % 2 === 0 ? 'bg-primary' : 'bg-blue-500';
          const textClass = idx % 2 === 0 ? 'text-primary' : 'text-blue-500';
          
          return (
            <div onClick={() => navigate('/challenges')} key={challenge.id} className="w-12 h-12 lg:w-full lg:h-auto lg:p-2 rounded-full lg:rounded-xl bg-surface hover:bg-surface-hover transition-colors flex items-center gap-3 cursor-pointer relative lg:static active:scale-95">
              <div className="w-12 h-12 rounded-full bg-surface-active flex items-center justify-center text-xl relative shrink-0">
                <Target className={`w-5 h-5 ${textClass}`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface ${color}`}></div>
              </div>
              <div className="hidden lg:block flex-1 overflow-hidden">
                <h4 className="text-sm font-medium text-white truncate">{challenge.title}</h4>
                <p className="text-xs text-text-muted">{challenge.progress}/{challenge.target} completed</p>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Messages / AI Coach quick access */}
      <div className="mt-auto flex flex-col items-center lg:items-start gap-4 pt-6 border-t border-border/30">
        <div onClick={() => navigate('/coach')} className="w-12 h-12 lg:w-full lg:h-auto lg:p-2 rounded-full lg:rounded-xl bg-surface hover:bg-surface-hover transition-colors flex items-center gap-3 cursor-pointer active:scale-95">
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
