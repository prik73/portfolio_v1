import { useEffect, useState } from "react";
import { useTransition } from "../context/TransitionContext";
import { trackVisit, getUniqueVisitors } from '../utils/analytics';
import { supabase } from '../lib/supabase';

// Import modular components
import Navigation from '../components/home/Navigation';
import HeroSection from '../components/home/HeroSection';
import ProjectsSection from '../components/home/ProjectsSection';
import AboutSection from '../components/home/AboutSection';
import ContactSection from '../components/home/ContactSection';
import Footer from '../components/home/Footer';

import ThemeToggle from '../components/ui/ThemeToggle';

export default function Home() {
  const [greeting, setGreeting] = useState("Good afternoon!");
  const [visitCount, setVisitCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const { startTransition } = useTransition();

  // Analytics & Realtime
  useEffect(() => {
    trackVisit();
    getUniqueVisitors().then(count => {
      if (count) setVisitCount(count);
    });

    if (supabase.supabaseUrl) {
      const channel = supabase.channel('online-users');
      channel
        .on('presence', { event: 'sync' }, () => {
          const presenceState = channel.presenceState();
          const count = Object.keys(presenceState).length;
          setOnlineUsers(count > 0 ? count : 1);
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await channel.track({ online_at: new Date().toISOString() });
          }
        });

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  // Update greeting based on time
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good morning!");
      else if (hour < 18) setGreeting("Good afternoon!");
      else setGreeting("Good evening!");
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleStatsClick = (e, path) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    startTransition(x, y, path);
  };

  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blogs', url: 'https://blog.doof.love' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'stats', label: 'Stats', path: '/stats' },
    { id: 'snake', label: 'Snake', path: '/snake' },
  ];

  return (
    <div className="min-h-screen scroll-smooth" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '17px', lineHeight: 1.6 }}>
      <ThemeToggle />

      <div className="mx-auto max-w-xl px-6 py-6">
        <Navigation navItems={navItems} handleStatsClick={handleStatsClick} />
        <HeroSection greeting={greeting} />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        <Footer visitCount={visitCount} onlineUsers={onlineUsers} />
      </div>
    </div>
  );
}
