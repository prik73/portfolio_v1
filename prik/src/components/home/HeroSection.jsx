import { motion } from 'framer-motion';

export default function HeroSection({ greeting, scrollToSection, sectionsRef }) {
    return (
        <section
            ref={el => sectionsRef.current['home'] = el}
            className="min-h-screen flex flex-col justify-center px-4 md:px-0"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[var(--theme-text)]">
                    {greeting}
                </h1>
                <p className="text-xl md:text-2xl mb-10 text-[var(--theme-text-muted)] leading-relaxed">
                    <span className="text-[var(--theme-text)] font-semibold">I'm Priyanshu</span>, a <span className="text-[var(--theme-text)] font-semibold">tinkerer</span> who tries to build scalable systems. Currently exploring what wild things I can do with web-technologies.<br /><br />
                    Have created some fun projects. Try them out, just scroll down, would love to know your feedback :)
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="px-6 py-3 rounded-lg font-medium transition-colors bg-[var(--theme-inverse-bg)] text-[var(--theme-inverse-text)] hover:opacity-90 shadow-lg"
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
