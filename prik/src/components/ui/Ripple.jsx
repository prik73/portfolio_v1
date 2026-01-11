import { motion, AnimatePresence } from 'framer-motion';

export const Ripple = ({ isActive, x, y, color, onComplete }) => {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{
                        width: 0,
                        height: 0,
                        x: x,
                        y: y,
                        opacity: 1,
                        borderRadius: "50%"
                    }}
                    animate={{
                        width: "300vmax",
                        height: "300vmax",
                        x: `calc(${x}px - 150vmax)`,
                        y: `calc(${y}px - 150vmax)`,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                    onAnimationComplete={onComplete}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 9999,
                        backgroundColor: color,
                        pointerEvents: 'none',
                    }}
                />
            )}
        </AnimatePresence>
    );
};
