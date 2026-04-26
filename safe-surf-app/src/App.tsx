import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import BeachDetail from './pages/BeachDetail';
import Missions from './pages/Missions';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Splash from './pages/Splash';
import { useState } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' as const } },
  exit:    { opacity: 0,         transition: { duration: 0.16 } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/"           element={<Home />} />
          <Route path="/map"        element={<MapPage />} />
          <Route path="/beach/:id"  element={<BeachDetail />} />
          <Route path="/missions"   element={<Missions />} />
          <Route path="/guide"      element={<Chat />} />
          <Route path="/me"         element={<Profile />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />;

  return (
    <BrowserRouter>
      <div className="relative">
        <AnimatedRoutes />
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
