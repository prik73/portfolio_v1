// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from 'framer-motion';
import { TransitionProvider } from './context/TransitionContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <TransitionProvider>
        <Analytics />
        <main className="">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </AnimatePresence>
        </main>
      </TransitionProvider>
    </ThemeProvider>
  );
}

export default App;

