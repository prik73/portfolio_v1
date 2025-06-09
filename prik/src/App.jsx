// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect, useRef } from 'react';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion'; 

function App() {
  const [count, setCount] = useState(null);
  const hasFetched = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch('http://localhost:3001/api/visits')
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Analytics />
        <Navbar />
        <main className="">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>
        <footer>
          <Footer count={count} />
        </footer>
        
      </div>
  );
}

export default App;
