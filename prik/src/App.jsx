// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from 'react';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/visits')
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Analytics />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer count={count} />
      </div>
    </Router>
  );
}

export default App;
