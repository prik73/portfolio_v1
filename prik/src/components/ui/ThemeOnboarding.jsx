import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMagic } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeOnboarding() {
    const [isVisible, setIsVisible] = useState(false);
    const { themeColor } = useTheme(); // We'll watch themeColor to detect changes

    useEffect(() => {
        // Check if user has already "learned" the magic
        const hasLearned = localStorage.getItem('hasLearnedThemeMagic');

        if (!hasLearned) {
            // Delay slightly so it doesn't pop in instantly on load
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    // If visible, listen for theme changes to dismiss
    useEffect(() => {
        if (isVisible) {
            // If theme changes while visible, it means they did it!
            // We set a small timeout to let them see the color change, then poof.
            const timer = setTimeout(() => {
                setIsVisible(false);
                localStorage.setItem('hasLearnedThemeMagic', 'true');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [themeColor, isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="fixed top-24 right-8 z-50 pointer-events-none p-4"
                >
                    <div className="relative flex flex-col items-center gap-2">
                        <motion.div
                            animate={{
                                y: [0, -5, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-[var(--theme-accent)] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        >
                            <FaMagic size={32} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-[var(--theme-surface)]/90 backdrop-blur-sm border border-[var(--theme-border)] px-4 py-2 rounded-lg text-sm font-medium shadow-xl text-[var(--theme-text)] text-center"
                        >
                            <p>Double-click / Press 'F'</p>
                            <p className="text-[10px] opacity-60 uppercase tracking-widest mt-0.5">to remix</p>
                        </motion.div>

                        {/* Connection Line */}
                        <div className="w-px h-8 bg-gradient-to-b from-[var(--theme-accent)] to-transparent opacity-50 absolute -top-12 right-4 hidden md:block" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
