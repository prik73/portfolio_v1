import { motion } from 'framer-motion';

export default function HeroSection({ greeting, scrollToSection, sectionsRef }) {
    return (
        <section
            ref={el => sectionsRef.current['home'] = el}
            className="min-h-screen flex flex-col justify-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                    {greeting}
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-[var(--theme-text-muted)]">
                    I'm Priyanshu, a backend developer who tries to build scalable systems, but my users are my few friends. But it can scale! :)
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="px-6 py-3 rounded-lg font-medium transition-colors bg-[var(--theme-inverse-bg)] text-[var(--theme-inverse-text)] hover:opacity-90"
                    >
                        View Projects
                    </button>
                    <a
                        href="https://github.com/prik73"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-lg font-medium transition-colors border border-[var(--theme-border)] hover:bg-[var(--theme-inverse-bg)] hover:text-[var(--theme-inverse-text)]"
                    >
                        GitHub
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
