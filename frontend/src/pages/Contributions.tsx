import { Flame, Star, Leaf, Award } from 'lucide-react';

export default function Contributions() {
  // Generate mock contribution data (last 30 days)
  const today = new Date();
  const contributions = Array.from({ length: 90 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (89 - i));
    
    // Weighted random logic for demo
    const rand = Math.random();
    let level = 0; // 0: None, 1: Low, 2: Medium, 3: High, 4: Excellent
    if (rand > 0.8) level = 4;
    else if (rand > 0.5) level = 3;
    else if (rand > 0.3) level = 2;
    else if (rand > 0.1) level = 1;
    
    return { date: d.toISOString().split('T')[0], level };
  });

  const levelColors: Record<number, string> = {
    0: 'bg-surface-active',
    1: 'bg-primary/20',
    2: 'bg-primary/50',
    3: 'bg-primary/80',
    4: 'bg-primary',
  };

  return (
    <div className="flex flex-col gap-8 h-full max-w-6xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-text-muted">
            Routine <span className="text-white font-semibold uppercase">Contributions</span>
          </h1>
          <p className="text-sm text-text-muted mt-2">Your consistency over time.</p>
        </div>
      </header>

      {/* Main Graph Card */}
      <div className="bg-surface rounded-3xl p-8 border border-border/50 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10 gap-4">
          <div className="flex gap-8">
            <div>
              <p className="text-sm text-text-muted mb-1">Total Routine Actions</p>
              <p className="text-2xl font-bold text-white">428</p>
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">Longest Streak</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-1"><Flame className="w-5 h-5"/> 18 Days</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-text-muted font-medium bg-background px-4 py-2 rounded-xl border border-border/30">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-surface-active"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/50"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/80"></div>
            <div className="w-3 h-3 rounded-sm bg-primary"></div>
            <span>More</span>
          </div>
        </div>

        {/* The Grid (Mocked as scrolling horizontally) */}
        <div className="overflow-x-auto pb-4 relative z-10 scrollbar-hide">
          <div className="min-w-[800px] flex gap-2 justify-end">
             {/* Creating column-major grid mockup for the last 90 days */}
             {Array.from({ length: 13 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-2">
                  {contributions.slice(weekIndex * 7, (weekIndex + 1) * 7).map((c) => (
                    <div 
                      key={c.date} 
                      className={`w-4 h-4 md:w-5 md:h-5 rounded-sm ${levelColors[c.level]} border border-background hover:border-white transition-colors cursor-pointer relative group`}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 whitespace-nowrap z-50">
                        {c.date} • Level {c.level}
                      </div>
                    </div>
                  ))}
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Badges / Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-3xl p-6 border border-border/30 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20 text-white shrink-0">
             <Star className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold">Early Bird</h4>
            <p className="text-text-muted text-xs">Consistent wake window.</p>
          </div>
        </div>

        <div className="bg-surface rounded-3xl p-6 border border-border/30 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white shrink-0">
             <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold">Locked In</h4>
            <p className="text-text-muted text-xs">10 focused study sessions.</p>
          </div>
        </div>

        <div className="bg-surface rounded-3xl p-6 border border-border/30 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white shrink-0">
             <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold">Balanced</h4>
            <p className="text-text-muted text-xs">Study goals met, sleep protected.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
