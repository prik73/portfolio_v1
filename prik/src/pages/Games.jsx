import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useTransition } from '../context/TransitionContext';
import { Link } from 'react-router-dom';
import SnakeGame from '../components/games/SnakeGame';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function Games() {
  const { themeColor } = useTheme();
  const { startTransition } = useTransition();
  const fg = themeColor.textColor;
  const bg = themeColor.backgroundColor;

  const handleHomeClick = (e) => {
    e.preventDefault();
    startTransition(e.clientX, e.clientY, '/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bg, color: fg }}
    >
      <ThemeToggle />

      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <a
          href="/"
          onClick={handleHomeClick}
          className="font-mono text-sm tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ color: fg + '88' }}
        >
          ← Back
        </a>
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: fg + '44' }}
        >
          prik.dev / games
        </span>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-10">
        <div className="text-center">
          <h1
            className="font-mono text-4xl font-bold tracking-widest uppercase mb-2"
            style={{ color: fg }}
          >
            Games
          </h1>
          <p
            className="font-mono text-sm tracking-wider"
            style={{ color: fg + '55' }}
          >
            a small break from the portfolio
          </p>
        </div>

        <SnakeGame />
      </main>

      {/* Footer */}
      <footer
        className="px-8 py-4 text-center font-mono text-xs tracking-wider"
        style={{ color: fg + '33', borderTop: `1px solid ${fg}11` }}
      >
        inspired by{' '}
        <a
          href="https://github.com/epidemian/snake"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-60 underline underline-offset-2"
          style={{ color: fg + '55' }}
        >
          epidemian/snake
        </a>
      </footer>
    </motion.div>
  );
}
