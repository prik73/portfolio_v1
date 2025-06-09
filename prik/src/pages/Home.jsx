import { useEffect, useState } from "react";
import { Github, Code, Coffee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuroraText } from "@/components/magicui/aurora-text"; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="min-h-screen w-full bg-gradient-to-t from-black to-neutral-900 text-white px-4 sm:px-6 md:px-10 md:pt-70 pt-30">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 max-w-6xl mx-auto w-full">
          
          {/* LEFT: Greeting & Intro */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {greeting}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              I'm Priyanshu, a 22-year-old developer with an insatiable curiosity for how things work under the hood.
              <br />
              I lose myself in YouTube videos explaining the design choices of legacy software that shaped today's tech 
              (even if my goldfish memory makes me forget it all within 48 hours).
              <br /><br />
              From elegant backend architectures to pixel-perfect UIs, I'm captivated by the subtle details that make 
              technology beautiful.
            </p>

            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com/prik73"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-white text-black rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
              >
                <Github className="mr-2 h-5 w-5" /> GitHub
              </a>
              
              <Link
                to="/projects"
                className="group relative inline-flex items-center px-5 py-2.5 overflow-hidden rounded-lg text-sm sm:text-base"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 group-hover:scale-105"></span>
                <span className="relative text-white font-medium">
                  View Projects →
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: Cards */}
          <div className="space-y-6">
            
            {/* Main About Card */}
            <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
              <CardHeader className="border-b border-neutral-700">
                <CardTitle className="text-lg sm:text-xl text-white">About Me</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400 pt-4 text-sm sm:text-base space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Currently Building</p>
                    <p className="text-xs">Something cool with React & Node.js</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Learning</p>
                    <p className="text-xs">System design patterns & distributed systems</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Based in</p>
                    <p className="text-xs">Delhi, India</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-neutral-700">
                  <p className="text-xs text-gray-500 mb-2">
                    I turn <AuroraText>Nariyal_paani</AuroraText> into code and occasionally 
                    Google how to center a div... for a friend, of course.
                  </p>
                  <Link 
                    to="/about" 
                    className="text-blue-400 hover:text-blue-300 text-xs hover:underline"
                  >
                    Read the full story →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Interests Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Tech Stack */}
              <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
                <CardContent className="pt-4">
                  <div className="text-sm font-medium text-white mb-3">// Tech Stack</div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="text-blue-400">const <span className="text-white">frontend</span> = [<span className="text-green-400">'React', 'JavaScript'</span>]</div>
                    <div className="text-blue-400">const <span className="text-white">backend</span> = [<span className="text-green-400">'Node.js', 'Express'</span>]</div>
                    <div className="text-blue-400">const <span className="text-white">database</span> = [<span className="text-green-400">'MongoDB'</span>]</div>
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
                <CardContent className="pt-4">
                  <div className="text-sm font-medium text-white mb-3">When not coding</div>
                  <div className="space-y-1.5 text-xs text-gray-300">
                    <div>🚴‍♂️ Cycling through Delhi</div>
                    <div>🥾 Weekend hiking trips</div>
                    <div>📚 Collecting unfinished books</div>
                    <div>☕ Perfect coffee brewing</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm group">
              <CardContent className="pt-4">
                <div className="text-center space-y-3">
                  <div className="text-sm text-gray-400">
                    Developer since 2022
                  </div>
                  <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Code className="w-3 h-3" />
                      <span>25+ repos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Coffee className="w-3 h-3" />
                      <span>∞ coffees</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                    Still Googling "how to center a div" 🤷‍♂️
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </motion.div>
  );
}