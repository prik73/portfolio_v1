import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ greeting, scrollToSection, sectionsRef }) {
    const [displayedGreeting, setDisplayedGreeting] = useState("");

    // Typewriter effect for greeting
    useEffect(() => {
        setDisplayedGreeting(""); // Reset on change
        let i = 0;
        const interval = setInterval(() => {
            if (i < greeting.length) {
                setDisplayedGreeting(prev => prev + greeting.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100); // Typing speed
        return () => clearInterval(interval);
    }, [greeting]);

    return (
        <section
            ref={el => sectionsRef.current['home'] = el}
            className="min-h-screen flex flex-col justify-center relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-6xl lg:text-8xl font-bold mb-6 tracking-tight">
                        <span className="opacity-80 block lg:inline mr-4">{displayedGreeting}</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <h2 className="text-3xl lg:text-5xl font-bold mb-8 tracking-tight">
                        I'm <span className="text-[var(--theme-accent)]">Priyanshu</span>.
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-xl lg:text-2xl mb-10 text-[var(--theme-text-muted)] max-w-2xl leading-relaxed"
                >
                    I build things for the web. My users are just my friends, but the apps scale like they're built for millions.
                    Scroll down to see what happens when code meets chaos.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex gap-4"
                >
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="px-8 py-4 rounded-xl font-medium transition-all bg-[var(--theme-inverse-bg)] text-[var(--theme-inverse-text)] hover:scale-105 hover:shadow-lg hover:shadow-[var(--theme-accent)]/20 active:scale-95"
                    >
                        View Projects
                    </button>
                    <a
                        href="https://github.com/prik73"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-xl font-medium transition-all border border-[var(--theme-border)] hover:bg-[var(--theme-inverse-bg)] hover:text-[var(--theme-inverse-text)] hover:scale-105 active:scale-95"
                    >
                        GitHub
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
