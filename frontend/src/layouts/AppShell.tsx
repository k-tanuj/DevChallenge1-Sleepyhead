import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-[#fce7e9] flex items-center justify-center p-4 lg:p-8">
      {/* Main App Container */}
      <div className="w-full max-w-[1600px] h-[90vh] bg-background rounded-3xl overflow-hidden flex shadow-2xl relative border-[6px] border-background">
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 scrollbar-hide">
          <Outlet />
        </main>
        
        <RightSidebar />
      </div>
    </div>
  );
}
