import { motion, AnimatePresence } from 'framer-motion';

export const GlitchTransition = ({ isActive }) => {
    return (
        <AnimatePresence>
            {isActive && (
                <>
                    {/* Main Blackout Curtain (TV Off Effect) */}
                    <motion.div
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{
                            scaleY: 1,
                            opacity: 1,
                            transition: { duration: 0.2, ease: "circIn" }
                        }}
                        exit={{
                            scaleY: 0,
                            opacity: 0,
                            transition: { duration: 0.3, ease: "circOut", delay: 0.1 }
                        }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'var(--theme-bg)', // Use theme background (usually black)
                            zIndex: 9999,
                            transformOrigin: 'center',
                        }}
                    >
                        {/* Center "Line" flash */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1, transition: { duration: 0.1, delay: 0.2 } }}
                            className="absolute top-1/2 left-0 w-full h-[2px] bg-[var(--theme-accent)]"
                        />
                    </motion.div>

                    {/* Glitch Noise Overlay (Optional extra spice) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] pointer-events-none mix-blend-overlay"
                        style={{
                            background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    var(--theme-accent) 2px,
                    var(--theme-accent) 4px
                )`,
                            backgroundSize: '100% 4px',
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    );
};
