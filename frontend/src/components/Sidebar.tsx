import { NavLink } from 'react-router-dom';
import { Home, Target, GitPullRequest, MessageSquare, User, Plus } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const navItems = [
    { icon: Home, path: '/', label: 'Dashboard' },
    { icon: Target, path: '/challenges', label: 'Challenges' },
    { icon: GitPullRequest, path: '/contributions', label: 'Contributions' },
    { icon: MessageSquare, path: '/coach', label: 'AI Coach' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  return (
    <aside className="w-24 border-r border-border/30 flex flex-col items-center py-8 justify-between relative z-10 bg-background">
      <div className="flex flex-col items-center gap-8">
        <div className="w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        <nav className="flex flex-col gap-4 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative group",
                isActive 
                  ? "bg-surface-active text-primary shadow-[inset_4px_0_0_var(--color-primary)]" 
                  : "text-text-muted hover:text-white hover:bg-surface-hover"
              )}
            >
              <item.icon className="w-5 h-5" />
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-surface text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
                {item.label}
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <button className="w-12 h-12 rounded-full border border-dashed border-text-muted flex items-center justify-center text-text-muted hover:text-white hover:border-white transition-colors mt-auto">
        <Plus className="w-5 h-5" />
      </button>
    </aside>
  );
}
