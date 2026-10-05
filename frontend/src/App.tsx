import { Routes, Route } from 'react-router-dom';
import AppShell from './layouts/AppShell';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import Contributions from './pages/Contributions';
import AICoach from './pages/AICoach';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="contributions" element={<Contributions />} />
        <Route path="coach" element={<AICoach />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
