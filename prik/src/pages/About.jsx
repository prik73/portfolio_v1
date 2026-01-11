import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import fool from '../assets/fool.png'
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function About() {
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
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20 lg:py-32 lg:ml-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side: About content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-gray-500">{'<'}</span>
              About
              <span className="text-gray-500">{' />'}</span>
            </h1>
            <p className="text-xl text-gray-400">
              The human behind the keyboard • Code enthusiast • Learning addict
            </p>
            <div className="text-gray-300 space-y-4">
              <p>
                Started my B.Tech degree in 2022, diving headfirst into the world of programming.
                By 2024, I was freelancing and building web applications that actually work.
              </p>
              <p>
                I specialize in backend development with a focus on building scalable,
                maintainable systems that solve real problems.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-block px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors w-fit"
            >
              See My Projects
            </Link>
          </motion.div>

          {/* Right side: Image */}
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            src={fool}
            alt="Profile"
            className="object-cover h-full w-full rounded-lg"
          />
        </div>

        {/* Additional section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-neutral-900 border border-neutral-800 shadow-lg">
            <CardHeader className="border-b border-neutral-800">
              <CardTitle className="text-2xl text-white font-bold">// README.md</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 pt-6 space-y-4">
              <p>
                Started coding in 2022 when I began my B.Tech journey. What began as course requirements
                quickly evolved into a passion for building things on the web.
              </p>
              <p>
                I specialize in the MERN stack (MongoDB, Express, React, Node.js) but I'm always
                exploring new technologies to add to my toolkit. In the summer of 2024, I took the leap
                into freelancing, helping clients bring their ideas to life.
              </p>
              <p>
                When I'm not coding, you might find me exploring new technologies, reading about
                system architecture, or working on side projects that push my skills further.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}