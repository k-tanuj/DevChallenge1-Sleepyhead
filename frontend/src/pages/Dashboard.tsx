import { useState, useEffect, useRef } from 'react';
import { Search, Bell, ShoppingCart, Flame, BookOpen, Wind, Moon, Star, Leaf, ChevronRight, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();
  
  // Timer State
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/dashboard')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
      
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const toggleSession = async () => {
    if (isSessionActive) {
      // Stop
      if (timerRef.current) clearInterval(timerRef.current);
      setIsSessionActive(false);
      const seconds = sessionTime;
      const minutes = Math.floor(seconds / 60);
      
      try {
        const res = await fetch('http://localhost:8000/api/study-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ duration_seconds: seconds })
        });
        const result = await res.json();
        
        // Refresh dashboard data to show new XP
        fetch('http://localhost:8000/api/dashboard')
          .then(r => r.json())
          .then(setData);

        alert(`Study session recorded! You stayed focused for ${minutes} min ${seconds % 60} sec. (+${result.xp_earned} XP)`);
      } catch (e) {
        console.error(e);
      }
      
      setSessionTime(0);
    } else {
      // Start
      setIsSessionActive(true);
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!data) return <div className="h-full flex items-center justify-center text-text-muted">Loading...</div>;

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Top Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-text-muted">
            Good evening, <span className="text-white font-semibold uppercase">{data.user.name}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search challenges..." 
              className="bg-surface/50 border border-border/50 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors w-64 placeholder:text-text-muted/50"
            />
          </div>
          
          <button onClick={() => alert("No new notifications")} className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-white hover:bg-surface-hover transition-colors relative active:scale-95">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1">
        
        {/* Left Column - Featured Plan & Challenges */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Featured Card - Tonight's Plan (like the Valorant card) */}
          <div className="bg-gradient-to-br from-primary/80 to-primary-hover rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-lg shadow-primary/20">
            {/* Background elements to simulate the art */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
            
            <div className="relative z-10 flex flex-col gap-2 max-w-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white text-primary text-xs font-bold rounded-full flex items-center gap-1">
                  <Flame className="w-4 h-4 text-primary" /> Tonight's Plan
                </span>
                <span className="text-white/80 text-xs font-medium bg-black/20 px-3 py-1 rounded-full">AI Recommended</span>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-2">Focus & Rest</h2>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                You've got 55 minutes of study remaining. Finish one focused session tonight and avoid pushing the remaining work past your planned bedtime of 11:30 PM.
              </p>
              
              <div className="flex items-center gap-4 mt-auto flex-wrap">
                <button 
                  onClick={toggleSession}
                  className={`${isSessionActive ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-primary hover:bg-white/90'} px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg active:scale-95 flex items-center gap-2 w-48 justify-center`}
                >
                  {isSessionActive ? (
                    <>
                      <Square className="w-4 h-4" fill="currentColor" /> {formatTime(sessionTime)}
                    </>
                  ) : 'Start Study Session'}
                </button>
                <button 
                  onClick={() => navigate('/coach')}
                  className="bg-surface-active text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-surface-hover transition-colors shadow-lg border border-border/50 active:scale-95"
                >
                  Plan Tomorrow
                </button>
                <div className="flex -space-x-3 ml-auto hidden sm:flex">
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface-active flex items-center justify-center text-xs">
                    <BookOpen className="w-5 h-5 text-text-muted" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-surface flex items-center justify-center text-xs">
                    <Wind className="w-5 h-5 text-text-muted" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center text-xs">
                    <Moon className="w-5 h-5 text-text-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Active Challenges (New Games section) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Daily Challenges</h3>
              <button onClick={() => navigate('/challenges')} className="text-text-muted text-sm hover:text-primary transition-colors active:scale-95">See All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Challenge Card 1 */}
              <div className="bg-surface p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div onClick={() => navigate('/challenges')} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors cursor-pointer z-10 active:scale-95">
                  <span className="font-bold">+</span>
                </div>
                
                {/* Visual Art/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-0"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-end pt-24">
                  <span className="text-xs text-primary font-bold mb-1">#042 • +50 XP</span>
                  <h4 className="text-lg font-bold text-white mb-2">Sleep Before 11:45 PM</h4>
                  <p className="text-text-muted text-xs mb-4">Complete your wind-down routine and be in bed before target.</p>
                  
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[57%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-text-muted font-bold tracking-wider uppercase">
                    <span>Progress</span>
                    <span>4 / 7</span>
                  </div>
                </div>
              </div>

              {/* Challenge Card 2 */}
              <div className="bg-surface p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div onClick={() => navigate('/challenges')} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors cursor-pointer z-10 active:scale-95">
                  <span className="font-bold">+</span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-0"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-end pt-24">
                  <span className="text-xs text-blue-500 font-bold mb-1">#043 • +75 XP</span>
                  <h4 className="text-lg font-bold text-white mb-2">Focused Study</h4>
                  <p className="text-text-muted text-xs mb-4">Complete a highly focused study session without distractions.</p>
                  
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[60%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-text-muted font-bold tracking-wider uppercase">
                    <span>Progress</span>
                    <span>3 / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Stats */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Your Routine Stats</h3>
            <button onClick={() => navigate('/contributions')} className="text-text-muted text-sm hover:text-white transition-colors active:scale-95">➔</button>
          </div>
          
          <div className="bg-gradient-to-b from-surface to-background p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden h-[400px]">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-150"></div>
            
            {/* The circular graphic - simulating the wavy one from Image 1 */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-8 mt-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-orange-400 to-purple-500 animate-pulse opacity-50 blur-md mix-blend-screen"></div>
              <div className="absolute inset-2 rounded-full bg-surface-active z-10 flex flex-col items-center justify-center shadow-inner">
                <span className="text-text-muted text-sm mb-1">Total Streak</span>
                <span className="text-4xl font-bold text-white">{data.streak.current} Days</span>
                <span className="text-primary text-xs font-bold mt-2 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Best: {data.streak.best}
                </span>
              </div>
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-orange-400 border-b-purple-500 border-l-surface-hover transform rotate-45 opacity-80 z-20"></div>
            </div>
            
            {/* Small stat badges at bottom */}
            <div className="flex items-center justify-between w-full px-4 gap-2 z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-2 shadow-lg shadow-primary/10">
                  <Moon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white">92%</span>
                <span className="text-[10px] text-text-muted">Sleep</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mb-2 shadow-lg shadow-blue-500/10">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white">85%</span>
                <span className="text-[10px] text-text-muted">Study</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mb-2 shadow-lg shadow-purple-500/10">
                  <Star className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-white">{data.user.xp}</span>
                <span className="text-[10px] text-text-muted">Total XP</span>
              </div>
            </div>
          </div>

          {/* Mini contribution snippet */}
          <div className="bg-surface rounded-3xl p-6 relative overflow-hidden flex items-center gap-4 group hover:bg-surface-hover transition-colors cursor-pointer">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400/20 to-green-600/20 flex items-center justify-center border border-green-500/30">
                <Leaf className="w-8 h-8 text-green-500" />
             </div>
             <div className="flex-1">
                <h4 className="text-white font-bold mb-1">Contributions</h4>
                <p className="text-text-muted text-xs">17 / 25 this month</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors text-text-muted">
                ➔
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
