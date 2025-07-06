import { useEffect, useState } from "react";
import { Github, ExternalLink, Mail, ArrowRight, CheckCircle, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {AuroraText} from "@/components/magicui/aurora-text"; 
import { motion } from 'framer-motion';

export default function Home() {
  const [greeting, setGreeting] = useState("Good morning!");

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

  // More honest and specific metrics
  const achievements = [
    { number: "10+", label: "Projects Built", description: "Personal & client work" },
    { number: "2", label: "Years Learning", description: "Continuous development" },
    { number: "React", label: "Primary Stack", description: "MERN specialization" },
    { number: "Remote", label: "Work Style", description: "Flexible collaboration" }
  ];

  // Tech-agnostic approach with specific examples
  const capabilities = [
    { 
      area: "Frontend Development", 
      description: "React-based SPAs with modern state management",
      examples: ["Component architecture", "State management", "Responsive design"]
    },
    { 
      area: "Backend Development", 
      description: "Node.js APIs with database integration",
      examples: ["RESTful APIs", "Database design", "Authentication"]
    },
    { 
      area: "Full-Stack Integration", 
      description: "End-to-end application development",
      examples: ["CI/CD setup", "Deployment", "Performance optimization"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="min-h-screen w-full bg-gradient-to-t from-black to-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
            
            {/* LEFT COLUMN - Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* More honest availability badge */}
              <motion.div 
                className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-700 rounded-full px-3 py-1.5 text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div 
                  className="w-1.5 h-1.5 bg-blue-400 rounded-full motion-safe:animate-pulse"
                  aria-hidden="true"
                ></div>
                <span className="text-blue-400 font-medium">Open to new opportunities</span>
              </motion.div>

              {/* Hero Heading */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="text-blue-400 text-base sm:text-lg">{greeting}</div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
                  I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Priyanshu</span>
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-semibold">
                  Full-Stack Developer
                </h2>
              </motion.div>

              {/* More specific value proposition */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-2xl">
                  I build <span className="text-blue-400 font-medium">responsive web applications</span> using 
                  modern JavaScript technologies. Currently focused on 
                  <span className="text-purple-400 font-medium"> React, Node.js, and MongoDB</span> but 
                  adaptable to your tech stack needs.
                </p>
                
                {/* Project types I'm good for */}
                <div className="text-sm text-gray-400">
                  <span className="font-medium text-gray-300">Best fit for:</span> Small to medium web applications, 
                  MVP development, and learning-focused collaborations
                </div>
              </motion.div>

              {/* More honest metrics */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {achievements.map((achievement, index) => (
                  <div key={achievement.label} className="text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400">{achievement.number}</div>
                    <div className="text-xs sm:text-sm text-gray-400 leading-tight">{achievement.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{achievement.description}</div>
                  </div>
                ))}
              </motion.div>

              {/* Clearer CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition text-sm sm:text-base font-medium shadow-lg"
                >
                  View My Projects <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition text-sm sm:text-base font-medium"
                >
                  <Mail className="mr-2 h-4 w-4" /> Start a Conversation
                </a>
                
                <a
                  href="https://github.com/prik73"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 border border-neutral-600 text-white rounded-lg hover:bg-neutral-800 transition text-sm"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </motion.div>

              {/* Contact info without exposing email */}
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Jaipur, India</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>UTC+5:30 timezone</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Email via contact page</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - Capabilities */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              
              {/* Capabilities instead of vague skills */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
                  <CardHeader className="border-b border-neutral-700 p-3 sm:p-4">
                    <CardTitle className="text-base sm:text-lg text-white">What I Can Build</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-4">
                      {capabilities.map((capability, index) => (
                        <div key={capability.area}>
                          <h4 className="text-sm font-medium text-blue-400 mb-1">{capability.area}</h4>
                          <p className="text-xs text-gray-300 mb-2">{capability.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {capability.examples.map((example) => (
                              <span key={example} className="text-xs bg-neutral-800 text-gray-400 px-2 py-1 rounded">
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Honest expectations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
                  <CardHeader className="border-b border-neutral-700 p-3 sm:p-4">
                    <CardTitle className="text-base sm:text-lg text-white">Working Together</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Clear communication</strong> throughout the development process</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Version-controlled code</strong> with documentation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Realistic timelines</strong> with regular progress updates</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Learning mindset</strong> - I'll research what I don't know</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Currently section with honesty */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
                  <CardHeader className="border-b border-neutral-700 p-3 sm:p-4">
                    <CardTitle className="text-base sm:text-lg text-white">Current Focus</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true"></span>
                        <span>Building <AuroraText>personal projects</AuroraText> to strengthen my portfolio</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true"></span>
                        <span>Learning advanced React patterns and Node.js best practices</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true"></span>
                        <span>Exploring modern deployment strategies and CI/CD</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* More honest final CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card className="bg-blue-900/20 border border-blue-700 shadow-lg">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">Have a project in mind?</h3>
                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                      Let's discuss your requirements and see if we're a good fit.
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition font-medium text-sm sm:text-base"
                    >
                      Start a Conversation <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}