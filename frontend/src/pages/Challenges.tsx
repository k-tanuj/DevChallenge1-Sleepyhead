import { useState, useEffect } from 'react';
import { Target, CheckCircle2, ChevronRight } from 'lucide-react';

interface ChallengeData {
  id: string | number;
  title: string;
  description: string;
  progress: number;
  target: number;
  xp_reward: number;
  difficulty: string;
  status: string;
  color?: string;
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<ChallengeData[]>([]);

  useEffect(() => {
    fetch('https://devchallenge1-sleepyhead.onrender.com/api/challenges')
      .then(r => r.json())
      .then(data => {
        // Map backend data to frontend colors
        const mapped = data.map((c: any, i: number) => ({
          ...c,
          id: c.id.toString(),
          desc: c.description,
          total: c.target,
          xp: c.xp_reward,
          diff: c.difficulty,
          color: i % 2 === 0 ? 'bg-primary' : 'bg-blue-500'
        }));
        setChallenges(mapped);
      });
  }, []);

  const completeChallenge = async (id: string) => {
    try {
      const res = await fetch(`https://devchallenge1-sleepyhead.onrender.com/api/challenges/${id}/complete`, { method: 'POST' });
      const updated = await res.json();
      
      setChallenges(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, progress: updated.progress, status: updated.status, color: updated.status === 'Completed' ? 'bg-green-500' : c.color };
        }
        return c;
      }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-text-muted">
            Active <span className="text-white font-semibold uppercase">Challenges</span>
          </h1>
          <p className="text-sm text-text-muted mt-2">Complete tasks to earn XP and level up your routine.</p>
        </div>
        
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-active text-white rounded-full text-sm font-medium border border-border">Active</button>
          <button className="px-4 py-2 bg-surface text-text-muted hover:text-white rounded-full text-sm font-medium transition-colors">Completed</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {challenges.map((c) => (
          <div key={c.id} className="bg-surface p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 border border-border/20 shadow-lg flex flex-col">
            <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-0`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 ${c.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'} text-[10px] font-bold rounded uppercase tracking-wider transition-colors`}>
                  #{c.id} • +{c.xp_reward} XP
                </span>
                {c.status === 'Completed' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Target className="w-5 h-5 text-text-muted" />}
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2 leading-tight">{c.title}</h4>
              <p className="text-text-muted text-sm mb-6 flex-1">{c.description}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between text-xs text-white font-medium mb-2">
                  <span>Progress</span>
                  <span>{c.progress} / {c.target}</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-4">
                  <div className={`h-full ${c.color} rounded-full transition-all duration-500`} style={{ width: `${(c.progress / c.target) * 100}%` }}></div>
                </div>
                
                <button 
                  onClick={() => completeChallenge(c.id as string)}
                  className={`w-full py-3 rounded-xl flex justify-center items-center gap-2 font-bold text-sm transition-colors ${c.status === 'Completed' ? 'bg-surface-active text-text-muted cursor-default' : 'bg-white text-background hover:bg-white/90'}`}
                >
                  {c.status === 'Completed' ? 'Completed' : 'Complete Challenge'}
                  {c.status !== 'Completed' && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
