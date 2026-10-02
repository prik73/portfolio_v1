import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
    const { toggleTheme, mode } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 text-sm underline underline-offset-2 hover:no-underline text-[var(--theme-link)]"
            title="Toggle dark mode"
        >
            {mode === 'dark' ? 'light' : 'dark'}
        </button>
    );
}
