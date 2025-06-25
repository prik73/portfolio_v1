import { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
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
            I'm Priyanshu, a developer fascinated by the craft behind the code. 
            <br />
            Building web applications and getting lost in YouTube videos about why legacy software still runs the world.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://github.com/prik73"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-white text-black rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
            >
              <Github className="mr-2 h-5 w-5" /> GitHub
            </a>
            <a
              href="/projects"
              className="inline-flex items-center px-5 py-2.5 border border-neutral-600 text-white rounded-lg hover:bg-neutral-800 transition text-sm sm:text-base"
            >
              <ExternalLink className="mr-2 h-5 w-5" /> Projects
            </a>
            <a
              href="/about"
              className="inline-flex items-center px-5 py-2.5 border border-neutral-600 text-white rounded-lg hover:bg-neutral-800 transition text-sm sm:text-base"
            >
              About
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 border border-neutral-600 text-white rounded-lg hover:bg-neutral-800 transition text-sm sm:text-base"
            >
              Contact
            </a>
          </div>
        </div>

        {/* RIGHT: Cards */}
        <div className="flex flex-col space-y-6">
          {/* Learning Journey Card */}
          <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
            <CardHeader className="border-b border-neutral-700">
              <CardTitle className="text-lg sm:text-xl text-white">// Learning in Public</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400 pt-4 text-sm sm:text-base">
              <p>
                Two years in and still amazed by how much I don't know. 
                Every project teaches me something new, every bug humbles me. 
                Still figuring things out, but enjoying the ride.
              </p>
            </CardContent>
          </Card>

          {/* Currently Card */}
          <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
            <CardHeader className="border-b border-neutral-700">
              <CardTitle className="text-lg sm:text-xl text-white">Currently</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Building full-stack web applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Exploring design × developer experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Training for my next cycling adventure</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technologies Card */}
          <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
            <CardHeader className="border-b border-neutral-700">
              <CardTitle className="text-lg sm:text-xl text-white">Technologies I've worked with</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-400 text-xs mb-3">
                Good engineering is tech agnostic, but for reference:
              </p>
              <div className="flex flex-wrap gap-2">
                {["C", "C++", "Java", "HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "PostgreSQL", "WebRTC", "MediaSoup", "Docker", "Python"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
    </motion.div>
  );
}