import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTransition } from "../context/TransitionContext";
import { useTheme } from "../context/ThemeContext";
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
  const [activeSection, setActiveSection] = useState("home");
  const [visitCount, setVisitCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const { themeColor, randomizeTheme } = useTheme();
  const { startTransition } = useTransition();
  const sectionsRef = useRef({});

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

  // Scrollspy + Width Expansion
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check if we've scrolled past home section
      const homeElement = sectionsRef.current['home'];
      if (homeElement) {
        const homeBottom = homeElement.offsetTop + homeElement.offsetHeight;
        setIsExpanded(window.scrollY > homeBottom - 200);
      }

      for (const [id, element] of Object.entries(sectionsRef.current)) {
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStatsClick = (e, path) => {
    e.preventDefault();
    if (path === '/stats') {
      const x = e.clientX;
      const y = e.clientY;
      startTransition(x, y, path);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'stats', label: 'Stats', path: '/stats' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColor.backgroundColor, color: themeColor.textColor }}>
      <ThemeToggle />
      <Navigation
        activeSection={activeSection}
        navItems={navItems}
        scrollToSection={scrollToSection}
        handleStatsClick={handleStatsClick}
      />

      <div
        className={`mx-auto px-6 lg:px-12 transition-all duration-500 ${isExpanded ? 'max-w-6xl' : 'max-w-4xl'
          }`}
      >
        <HeroSection
          greeting={greeting}
          scrollToSection={scrollToSection}
          sectionsRef={sectionsRef}
        />

        <ProjectsSection sectionsRef={sectionsRef} />

        <AboutSection sectionsRef={sectionsRef} />

        <ContactSection sectionsRef={sectionsRef} />

        <Footer visitCount={visitCount} onlineUsers={onlineUsers} />
      </div>
    </div>
  );
}