import { useEffect, useState } from "react";
import { Github } from "lucide-react";
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
          </div>
        </div>

        {/* RIGHT: Cards */}
        <div className="flex flex-col space-y-6">
          {/* About Me Card */}
          <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
            <CardHeader className="border-b border-neutral-700">
              <CardTitle className="text-lg sm:text-xl text-white">404: About Me Not Found</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400 pt-4 text-sm sm:text-base">
              <p>
                Legend says there should be an "About Me" section here, but who reads those anyway? 
                Let's just say I turn <AuroraText>Nariyal_paani</AuroraText> into code and occasionally 
                Google how to center a div... for a friend, of course.
              </p>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card className="bg-neutral-900/70 border border-neutral-700 shadow-lg backdrop-blur-sm">
            <CardHeader className="border-b border-neutral-700">
              <CardTitle className="text-lg sm:text-xl text-white">Tech I Love</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "React", "Next.js", "Node.js", "Tailwind CSS", "TypeScript"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-gray-300"
                  >
                    {skill}
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
