import { motion } from 'framer-motion';
import { FaDice, FaPalette, FaRandom, FaMagic } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
    const { randomizeTheme } = useTheme();

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={randomizeTheme}
            className="fixed top-6 right-6 z-50 p-2 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors shadow-sm"
            title="Roll the dice! (Double-click anywhere)"
        >
            <FaDice size={20} />
        </motion.button>
    );
}
