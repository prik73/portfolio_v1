import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTransition } from "../context/TransitionContext";
import { useTheme } from "../context/ThemeContext";
import { Github, ExternalLink, Mail } from 'lucide-react';
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";


const projects = [
  {
    title: "Clickity (famous among the GEN Z)",
    description: "A beautiful nonsense project that somehow got 1000 people to use it :) ",
    techStack: ["Node.js", "React", "Tailwind", "AWS", "GitHub Actions", "i dunno why I added actions, but still"],
    live: "https://clic.prik.dev",
  },
  {
    title: "SMM Foundation Website",
    description: "freelance project for SMM Foundation, which is an NGO based in Gurgaon.",
    techStack: ["React", "Bootstrap"],
    github: "https://github.com/prik73/smm-foundation-website",
    live: "https://smmfoundation.org.in",
  },
  {
    title: "Drunk Monk Micro-Blogging",
    description: "Full-stack micro-blogging platform with ChatGPT hate speech detection",
    techStack: ["MERN", "JWT", "Cloudinary"],
    live: "https://drunk-monk-micro-bloging.onrender.com/",
    github: "https://github.com/prik73/Drunk-Monk-Micro-Blogging",
  },
  {
    title: "Multithreaded Reverse Proxy Server",
    description: "Reverse proxy web server in C with thread pools and LRU cache",
    techStack: ["C", "Sockets", "Multithreading"],
    github: "https://github.com/prik73/reverse-proxy-server",
  },
  {
    title: "Drunk Ape M2",
    description: "Video calling and collaborative code editor platform",
    techStack: ["WebRTC", "Socket.IO", "React"],
    live: "https://minor2codevc.vercel.app/",
    github: "https://github.com/prik73/drunk_ape_m2",
  },
  {
    title: "Web IDE Basic",
    description: "Web-based IDE with code editing and execution",
    techStack: ["React", "CodeMirror", "Node.js"],
    live: "https://web-ide-pg-client.onrender.com/",
    github: "https://github.com/prik73/web_ide_basic",
  },
  {
    title: "Particle Design",
    description: "Interactive particle animations",
    techStack: ["JavaScript", "Canvas"],
    github: "https://github.com/prik73/particle_design",
    live: "https://particle-design.vercel.app/"
  },
];

import { trackVisit, getUniqueVisitors } from '../utils/analytics';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [greeting, setGreeting] = useState("Good afternoon!");
  const [activeSection, setActiveSection] = useState("home");
  const [visitCount, setVisitCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const { themeColor, randomizeTheme } = useTheme();
  const { startTransition } = useTransition();
  const sectionsRef = useRef({});

  // Analytics & Realtime
  useEffect(() => {
    // 1. Track Visit & Get Total Unique
    trackVisit();
    getUniqueVisitors().then(count => {
      if (count) setVisitCount(count);
    });

    // 2. Realtime Online Users
    if (supabase.supabaseUrl) { // Only if configured
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
    const intervalId = setInterval(updateGreeting, 3600000);
    return () => clearInterval(intervalId);
  }, []);



  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = sectionsRef.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
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
    } else {
      window.location.href = path; // Fallback for other paths if any
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

    <div className="">
      {/* Left Sidebar Navigation */}
      <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => {
                if (item.path) {
                  handleStatsClick(e, item.path);
                } else {
                  scrollToSection(item.id);
                }
              }}
              className={`
                text-sm font-medium transition-all duration-300 relative group text-left
                ${activeSection === item.id
                  ? 'text-[var(--theme-text)]'
                  : 'text-[var(--theme-text-muted)] hover:opacity-100'}
              `}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--theme-text)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom-Right Navigation */}
      <nav className="lg:hidden fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-6 items-end">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={(e) => {
                if (item.path) {
                  handleStatsClick(e, item.path);
                } else {
                  scrollToSection(item.id);
                }
              }}
              className={`
                text-sm font-medium transition-all duration-300 relative group text-right
                ${activeSection === item.id
                  ? 'text-[var(--theme-text)]'
                  : 'text-[var(--theme-text-muted)] hover:opacity-100'}
              `}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeMobileNav"
                  className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--theme-text)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 lg:ml-48">

        {/* Hero Section */}
        <section
          ref={el => sectionsRef.current['home'] = el}
          className="min-h-screen flex flex-col justify-center py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              {greeting}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-[var(--theme-text-muted)]">
              I'm Priyanshu, a backend developer who tries to build scalable systems, but my users are my few friends. But it can scale! :)
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 rounded-lg font-medium transition-colors bg-[var(--theme-inverse-bg)] text-[var(--theme-inverse-text)] hover:opacity-90"
              >
                View Projects
              </button>
              <a
                href="https://github.com/prik73"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-medium transition-colors border border-[var(--theme-border)] hover:bg-[var(--theme-inverse-bg)] hover:text-[var(--theme-inverse-text)]"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section
          ref={el => sectionsRef.current['projects'] = el}
          data-section="projects"
          className="min-h-screen flex flex-col justify-center py-20 border-t border-[var(--theme-border)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="pr-20 lg:pr-0"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-12">Projects</h2>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-[var(--theme-border)] pb-6 last:border-b-0"
                >
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold mb-2 hover:opacity-80 transition-colors inline-block text-[var(--theme-text)]"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <h3 className="text-xl font-semibold mb-2 text-[var(--theme-text)]">{project.title}</h3>
                  )}
                  <p className="mb-3 text-[var(--theme-text-muted)]">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded border border-[var(--theme-border)] text-[var(--theme-text)] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 text-sm">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 transition-colors text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[var(--theme-text)] font-semibold hover:opacity-80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          ref={el => sectionsRef.current['about'] = el}
          data-section="about"
          className="min-h-screen flex flex-col justify-center py-20 border-t border-[var(--theme-border)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="pr-20 lg:pr-0"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              <span className="text-[var(--theme-text-muted)]">{'<'}</span>
              About
              <span className="text-[var(--theme-text-muted)]">{' />'}</span>
            </h2>

            <div className="space-y-4 text-lg leading-relaxed max-w-2xl text-[var(--theme-text-muted)]">
              <p>
                Started my B.Tech degree in 2022, diving headfirst into the world of programming.
                By 2024, I was freelancing and building web applications that solve real problems.
              </p>

              <p>
                I build backend systems that don't just work, they scale. From designing RESTful APIs
                to optimizing database queries, I focus on writing code that's maintainable, performant,
                and actually makes sense six months later.
              </p>

              <p>
                Currently exploring microservices architecture, API design patterns, and database
                optimization to build better systems.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section
          ref={el => sectionsRef.current['contact'] = el}
          className="min-h-screen flex flex-col justify-center py-20 border-t border-[var(--theme-border)] text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-12">Get in Touch</h2>
            <a
              href="mailto:prinovac@gmail.com"
              className="text-xl transition-colors mb-8 inline-block text-[var(--theme-text)] hover:opacity-80"
            >
              prinovac@gmail.com
            </a>
            <div className="flex gap-6 items-center justify-center text-2xl mt-8 text-[var(--theme-text-muted)]">
              {/* Social Icons would go here if we want them back, or keep it super minimal */}
              <a href="https://github.com/prik73" target="_blank" className="hover:text-[var(--theme-text)]"><FaGithub /></a>
              <a href="https://twitter.com/prik73" target="_blank" className="hover:text-[var(--theme-text)]"><FaTwitter /></a>
              <a href="https://instagram.com/catchydham" target="_blank" className="hover:text-[var(--theme-text)]"><FaInstagram /></a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <div className="py-8 text-center text-sm border-t border-[var(--theme-border)] text-[var(--theme-text-muted)] flex flex-col gap-2 items-center">
          <p>Built with sweat and blood.</p>
          {(visitCount > 0) && (
            <div className="flex gap-4 items-center justify-center text-xs opacity-70">
              <span>Total Visits: {visitCount.toLocaleString()}</span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse"></div>
                {onlineUsers} Online
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}