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

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="px-5 py-2 text-sm font-mono tracking-widest uppercase transition-all duration-200 border border-[var(--theme-text)] text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
                    >
                        View Projects
                    </button>
                    <a
                        href="https://blog.prik.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 text-sm font-mono tracking-widest uppercase transition-all duration-200 border border-[var(--theme-text)] text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
                    >
                        Read Blogs
                    </a>
                    <a
                        href="https://github.com/prik73"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 text-sm font-mono tracking-widest uppercase transition-all duration-200 border border-[var(--theme-text)] text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://drive.google.com/file/d/14yioCM1VcLtcMuhdQgaiJ8pU58519Ze8/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 text-sm font-mono tracking-widest uppercase transition-all duration-200 border border-[var(--theme-text)] text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
                    >
                        Resume
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
