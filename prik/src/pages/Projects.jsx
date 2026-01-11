import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuroraText } from "@/components/magicui/aurora-text";
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, MapPin, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const projects = [
  {
    title: "Drunk Monk Micro-Blogging",
    description: "A full-stack micro-blogging platform inspired by Twitter, featuring ChatGPT-powered hate speech detection and JWT-based authentication.",
    techStack: ["MERN", "JavaScript", "daisyUI", "JWT", "Cloudinary"],
    live: "https://drunk-monk-micro-bloging.onrender.com/",
    github: "https://github.com/prik73/Drunk-Monk-Micro-Blogging",
    featured: true
  },
  {
    title: "SMM Foundation Website",
    description: "Developed and deployed a responsive website for SMM Foundation using React.js and Bootstrap.",
    techStack: ["React", "React-Bootstrap", "JavaScript"],
    github: "https://github.com/prik73/smm-foundation-website",
    live: "https://smmfoundation.org.in",
    featured: true
  },
  {
    title: "Multithreaded Reverse Proxy Server",
    description: "Developed a multithreaded reverse proxy web server in C with low-level socket programming and thread pools to handle concurrent client requests efficiently.",
    techStack: ["C", "Sockets", "LRU Cache", "Multithreading"],
    github: "https://github.com/prik73/reverse-proxy-server",
    featured: true
  },
  {
    title: "Drunk Ape M2",
    description: "A video calling and collaborative code editor platform tailored for developers.",
    techStack: ["WebRTC", "Socket.IO", "React", "CodeMirror"],
    live: "https://minor2codevc.vercel.app/",
    github: "https://github.com/prik73/drunk_ape_m2",
  },
  {
    title: "Fractal App",
    description: "An assignment project focused on fractal generation and visualization.",
    techStack: ["React", "Canvas", "JavaScript"],
    live: "https://fractal-app-brown.vercel.app/",
    github: "https://github.com/prik73/fractal_app",
  },
  {
    title: "Digitalyz Assignment",
    description: "An assignment project for Digitalyz. They didn't hire me, but the experience was valuable.",
    techStack: ["React", "JavaScript"],
    live: "https://digitalyz-assignment.vercel.app/",
    github: "https://github.com/prik73/digitalyz_assignment",
  },
  {
    title: "Web IDE Basic",
    description: "A basic web-based IDE supporting code editing and execution.",
    techStack: ["React", "CodeMirror", "Node.js"],
    live: "https://web-ide-pg-client.onrender.com/",
    github: "https://github.com/prik73/web_ide_basic",
  },
  {
    title: "Particle Design",
    description: "An interactive particle design project showcasing animations and user interactions.",
    techStack: ["JavaScript", "Canvas", "HTML5"],
    github: "https://github.com/prik73/particle_design",
    live: "https://particle-design.vercel.app/"
  },
];

export default function Projects() {
  const [currentTime] = useState(new Date());
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Left Sidebar Navigation */}
      <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                text-sm font-medium transition-all duration-300 relative group
                ${location.pathname === item.path
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              {location.pathname === item.path && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800">
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-lg font-bold">prik.73</span>
          <div className="flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  text-sm font-medium transition-colors
                  ${location.pathname === item.path
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20 lg:py-32 lg:ml-48">

        {/* Header with time info */}
        <div className="w-full max-w-6xl mb-8">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Delhi, India</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs">Available for work</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <AuroraText>Projects</AuroraText> I've built
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of things I've built over the last year
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl w-full">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`bg-neutral-900/70 border shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-neutral-900/90 ${project.featured
                    ? 'border-blue-500/50 hover:border-blue-400'
                    : 'border-neutral-700 hover:border-neutral-600'
                  }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white hover:text-blue-400 transition-colors duration-200">{project.title}</CardTitle>
                    {project.featured && (
                      <motion.div
                        className="flex items-center space-x-1 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                      </motion.div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="text-gray-300 flex-1 flex flex-col">
                  <p className="mb-4 flex-1 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="bg-neutral-800/50 text-gray-300 text-xs px-2 py-1 rounded border border-neutral-700/50 hover:border-blue-500/50 hover:bg-blue-950/30 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="mr-1 h-4 w-4" />
                      Code
                    </motion.a>
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="mr-1 h-4 w-4" />
                        Live
                      </motion.a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center max-w-2xl"
        >
          <Card className="bg-gradient-to-br from-neutral-900/50 to-blue-950/20 border border-blue-500/30 shadow-xl backdrop-blur-sm">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-3 text-white">Let's build something together</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm always excited to work on interesting projects and collaborate with creative people.
                Whether you have an idea you want to bring to life or just want to chat about tech, I'd love to hear from you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium"
                  >
                    Get in Touch
                  </Link>
                </motion.div>

                <motion.a
                  href="mailto:prinovac@gmail.com"
                  className="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg font-medium transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="absolute inset-0 border border-white/20 group-hover:border-white/40 rounded-lg transition-colors duration-300"></span>
                  <span className="relative text-gray-300 group-hover:text-white transition-colors duration-300">
                    Send Email →
                  </span>
                </motion.a>
              </div>

              <p className="text-gray-500 text-sm mt-4">
                Usually respond within 24 hours ⚡
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}