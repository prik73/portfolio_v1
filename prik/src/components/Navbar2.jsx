import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Utility function for conditional class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Navigation links configuration
const NAV_LINKS = [
  { 
    to: '/', 
    label: 'Home', 
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  { 
    to: '/about', 
    label: 'About', 
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )
  },
  { 
    to: '/projects', 
    label: 'Projects', 
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    )
  },
  { 
    to: '/contact', 
    label: 'Contact', 
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    )
  }
];

export default function Navbar2() {
  const { pathname } = useLocation();

  return (
    <TooltipProvider>
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 py-3",
          "bg-white/40 dark:bg-black/40", // Glassmorphic background
          "backdrop-blur-xl", // Blur effect
          "border-b border-gray-200/50 dark:border-gray-800/50", // Subtle border
          "shadow-lg shadow-gray-200/20 dark:shadow-black/20", // Skeumorphic shadow
          "flex justify-between items-center"
        )}
      >
        {/* Logo Section */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Priyanshu
          </h1>
        </motion.div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-2">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.to;

            return (
              <li key={link.to}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={link.to}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "relative group w-10 h-10 rounded-full transition-all duration-300",
                          isActive 
                            ? "bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                            : "hover:bg-gray-100/50 dark:hover:bg-gray-800/30",
                          "flex items-center justify-center"
                        )}
                      >
                        <Icon />
                        <motion.div
                          layoutId="active-indicator"
                          className={cn(
                            "absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full",
                            isActive 
                              ? "bg-blue-600 dark:bg-blue-400" 
                              : "bg-transparent"
                          )}
                        />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {link.label}
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </TooltipProvider>
  );
}