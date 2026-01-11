import { FaGithub, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import ArtImage from "../components/ArtImage";
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Contact() {
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
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20 lg:py-32 lg:ml-48 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <ArtImage />
          <h1 className="text-5xl font-bold mb-4">Let's Get in Touch</h1>
          <p className="mb-8 text-gray-400 max-w-2xl mx-auto text-lg">
            Whether it's a project, a question, or just a hello — I'd love to hear from you.
            Feel free to drop me an email or connect on any platform below.
          </p>

          <div className="bg-neutral-900 border border-neutral-800 px-8 py-6 rounded-lg shadow-lg mb-8 inline-block">
            <div className="flex items-center justify-center gap-3 text-lg text-white">
              <FaEnvelope className="text-gray-300 text-xl" />
              <a
                href="mailto:prinovac@gmail.com"
                className="hover:underline text-blue-400 font-medium"
              >
                prinovac@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-8 items-center justify-center text-3xl text-gray-300">
            <motion.a
              href="https://github.com/prik73"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/catchydham/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://twitter.com/prik73"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTwitter />
            </motion.a>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Thanks for stopping by — really means a lot.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
