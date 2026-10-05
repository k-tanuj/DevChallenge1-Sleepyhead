import { Target, Clock, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Challenges() {
  const challenges = [
    { id: '042', title: 'Sleep Before 11:45 PM', desc: 'Complete your wind-down routine and be in bed before your target bedtime.', progress: 4, total: 7, xp: 50, diff: 'Easy', status: 'Active', color: 'bg-primary' },
    { id: '043', title: 'Focused Study Session', desc: 'Complete a highly focused study session without checking your phone.', progress: 3, total: 5, xp: 75, diff: 'Medium', status: 'Active', color: 'bg-blue-500' },
    { id: '044', title: 'Wake Within Target Window', desc: 'Wake up between 7:00 AM and 7:30 AM without hitting snooze.', progress: 5, total: 7, xp: 50, diff: 'Easy', status: 'Active', color: 'bg-yellow-500' },
    { id: '045', title: 'Protect Bedtime', desc: 'Stop studying at least 45 minutes before your planned bedtime.', progress: 1, total: 1, xp: 100, diff: 'Hard', status: 'Completed', color: 'bg-green-500' },
  ];

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
                <span className={`px-2 py-1 ${c.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'} text-[10px] font-bold rounded uppercase tracking-wider`}>
                  #{c.id} • +{c.xp} XP
                </span>
                {c.status === 'Completed' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Target className="w-5 h-5 text-text-muted" />}
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2 leading-tight">{c.title}</h4>
              <p className="text-text-muted text-sm mb-6 flex-1">{c.desc}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between text-xs text-white font-medium mb-2">
                  <span>Progress</span>
                  <span>{c.progress} / {c.total}</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-4">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: `${(c.progress / c.total) * 100}%` }}></div>
                </div>
                
                <button className={`w-full py-3 rounded-xl flex justify-center items-center gap-2 font-bold text-sm transition-colors ${c.status === 'Completed' ? 'bg-surface-active text-text-muted cursor-default' : 'bg-white text-background hover:bg-white/90'}`}>
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
