import { useState, useEffect } from 'react';
import { LogOut, Settings, Bell, Shield, Smartphone, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/profile')
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return <div className="h-full flex items-center justify-center text-text-muted">Loading...</div>;

  return (
    <div className="flex flex-col gap-8 h-full max-w-4xl mx-auto w-full">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-text-muted">
            Your <span className="text-white font-semibold uppercase">Profile</span>
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: User Card */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-surface rounded-3xl p-8 border border-border/50 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-primary/20 to-transparent"></div>
            <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-surface z-10 mb-4 flex items-center justify-center overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tanuj" alt="Tanuj" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 relative z-10">{data.user.name}</h2>
            <p className="text-primary font-semibold text-sm mb-6 relative z-10">Level {data.user.level} Maintainer</p>
            
            <div className="w-full h-1.5 bg-background rounded-full mb-2">
               <div className="h-full bg-primary w-[75%] rounded-full"></div>
            </div>
            <div className="flex justify-between w-full text-xs font-bold text-text-muted uppercase tracking-wider mb-8">
               <span>{data.user.xp} XP</span>
               <span>1000 XP (Lvl 9)</span>
            </div>

            <div className="w-full flex flex-col gap-2 relative z-10">
              <button onClick={() => alert("Edit Profile Modal Opened")} className="w-full py-3 bg-surface-active text-white rounded-xl text-sm font-medium hover:bg-surface-hover transition-colors flex items-center justify-center gap-2 active:scale-95">
                <Settings className="w-4 h-4" /> Edit Profile
              </button>
              <button onClick={() => alert("Signed Out")} className="w-full py-3 bg-transparent text-text-muted rounded-xl text-sm font-medium hover:text-primary transition-colors flex items-center justify-center gap-2 active:scale-95">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-surface rounded-3xl p-8 border border-border/50 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6">Your Routine</h3>
            
            <div className="flex flex-col gap-4">
              <div className="bg-background rounded-2xl p-4 flex justify-between items-center">
                 <div>
                   <p className="text-white font-medium mb-1">Preferred Study Window</p>
                   <p className="text-text-muted text-xs">When you are most productive.</p>
                 </div>
                 <div className="text-primary font-bold bg-primary/10 px-4 py-2 rounded-lg">7 PM - 10 PM</div>
              </div>
              
              <div className="bg-background rounded-2xl p-4 flex justify-between items-center">
                 <div>
                   <p className="text-white font-medium mb-1">Target Bedtime</p>
                   <p className="text-text-muted text-xs">AI will plan around this.</p>
                 </div>
                 <div className="text-white font-bold bg-surface-active px-4 py-2 rounded-lg">11:30 PM</div>
              </div>
              
              <div className="bg-background rounded-2xl p-4 flex justify-between items-center">
                 <div>
                   <p className="text-white font-medium mb-1">Target Wake Time</p>
                 </div>
                 <div className="text-white font-bold bg-surface-active px-4 py-2 rounded-lg">7:30 AM</div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-3xl p-8 border border-border/50 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6">Exam Mode</h3>
            <p className="text-text-muted text-sm mb-4">Currently active exam configuration.</p>
            
            <div className="bg-background rounded-2xl p-5 border border-primary/30 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
               <div className="flex justify-between items-start mb-4 relative z-10">
                 <div>
                   <h4 className="text-lg font-bold text-white">Advanced Java</h4>
                   <p className="text-primary text-sm font-medium">Exam: Friday</p>
                 </div>
                 <button className="text-text-muted hover:text-white transition-colors">Edit</button>
               </div>
               
               <div className="flex flex-col gap-2 relative z-10 text-sm">
                 <div className="flex justify-between text-white/80"><span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Unit 1</span><span>100%</span></div>
                 <div className="flex justify-between text-white/80"><span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Unit 2</span><span>100%</span></div>
                 <div className="flex justify-between text-white/80"><span className="flex items-center gap-2"><Shield className="w-4 h-4 text-yellow-500" /> Unit 3</span><span>60%</span></div>
                 <div className="flex justify-between text-white/80"><span className="flex items-center gap-2"><Shield className="w-4 h-4 text-text-muted" /> Unit 4</span><span>0%</span></div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
