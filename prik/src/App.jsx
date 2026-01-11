// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Analytics />
      <main className="">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;

