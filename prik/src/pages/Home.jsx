import { useEffect, useState } from "react";
import { Github, ArrowRight } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text"; 

export default function Home() {
  const [greeting, setGreeting] = useState("Good morning!");
  const [coffeeCount, setCoffeeCount] = useState(3);

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

  const handleCoffeeClick = () => {
    setCoffeeCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        
        {/* Main Content - Single Column, Natural Flow */}
        <div className="space-y-12">
          
          {/* Hero Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{greeting}</h1>
              <h2 className="text-2xl text-blue-400">I'm Priyanshu</h2>
            </div>
            
            <div className="text-gray-300 space-y-4 max-w-2xl">
              <p>
                22-year-old developer who gets genuinely excited about clean code 
                and loses track of time watching YouTube videos about why legacy 
                systems are still running the world.
              </p>
              
              <p>
                I turn <AuroraText>problems into solutions</AuroraText> using React, 
                Node.js, and an unhealthy amount of Stack Overflow.
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href="/projects"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
              >
                See my work <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              
              <a
                href="https://github.com/prik73"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-600 text-white rounded hover:bg-gray-800 transition"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="border-t border-gray-800 pt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">// About Me (Status: 404)</h3>
            <div className="text-gray-400 max-w-2xl space-y-3">
              <p>
                My "About Me" section is currently debugging itself. While it's down, 
                here's what you need to know: I turn coffee into functional components 
                and have never met a bug that couldn't be fixed with more console.logs.
              </p>
              <a href="/about" className="text-blue-400 hover:underline">
                Debug this section →
              </a>
            </div>
          </div>

          {/* Skills Section */}
          <div className="border-t border-gray-800 pt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Things I Pretend to Master</h3>
            <div className="max-w-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">JavaScript</span>
                <span className="text-green-400 font-mono text-sm">▓▓▓▓▓▓▓▓░░ 80%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">React</span>
                <span className="text-blue-400 font-mono text-sm">▓▓▓▓▓▓▓░░░ 75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Centering Divs</span>
                <span className="text-yellow-400 font-mono text-sm">▓▓▓▓▓▓░░░░ 60%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Imposter Syndrome</span>
                <span className="text-red-400 font-mono text-sm">▓▓▓▓▓▓▓▓▓▓ 100%</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                * Percentages may fluctuate based on coffee intake
              </p>
            </div>
          </div>

          {/* Currently Section */}
          <div className="border-t border-gray-800 pt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Currently</h3>
            <div className="text-gray-400 max-w-2xl">
              <ul className="space-y-2">
                <li>• Building things that hopefully don't break in production</li>
                <li>• Learning why my code works on my machine but nowhere else</li>
                <li>• Pretending to understand system design</li>
                <li>• Available for projects (translation: please hire me)</li>
              </ul>
              <div className="mt-4">
                <a href="/contact" className="text-green-400 hover:underline">
                  Let's work together →
                </a>
              </div>
            </div>
          </div>

          {/* Projects CTA */}
          <div className="border-t border-gray-800 pt-8">
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6 max-w-lg">
              <h3 className="text-lg font-semibold text-white mb-2">
                Want to see what I've actually built?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Spoiler: Some of it even works as intended.
              </p>
              <a
                href="/projects"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 pt-6 text-sm text-gray-500">
            <p>
              Currently powered by {coffeeCount} cups of coffee today
              <button 
                onClick={handleCoffeeClick}
                className="ml-2 opacity-40 hover:opacity-80 transition-opacity"
                title="☕"
              >
                ☕
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}