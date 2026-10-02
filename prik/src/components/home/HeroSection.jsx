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
                <p className="text-xl md:text-2xl mb-4 text-[var(--theme-text-muted)] leading-relaxed">
                    <span className="text-[var(--theme-text)] font-semibold">I'm Priyanshu</span>, a <span className="text-[var(--theme-text)] font-semibold">tinkerer</span>.
                </p>
                <ul className="text-xl md:text-2xl mb-6 text-[var(--theme-text-muted)] leading-relaxed space-y-2">
                    <li className="flex gap-3"><span aria-hidden="true">–</span><span>Currently at <span className="text-[var(--theme-text)] font-semibold">Apollyon Dynamics</span>, witnessing the team do great things.</span></li>
                    <li className="flex gap-3"><span aria-hidden="true">–</span><span>am sometimes successful in Trying to try new stuff, also exploring what can be done with web technologies.</span></li>
                    <li className="flex gap-3"><span aria-hidden="true">–</span><span>Earlier used to create fun, scalable applications.</span></li>
                </ul>
                <p className="text-xl md:text-2xl mb-10 text-[var(--theme-text-muted)] leading-relaxed">
                    Try them out, just scroll down, would love to know your feedback :)
                </p>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="px-5 py-2 text-sm font-mono tracking-widest uppercase transition-all duration-200 border border-[var(--theme-text)] text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
                    >
                        View Projects
                    </button>
                    <a
                        href="https://blog.doof.love"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 text-sm font-mono tracking-widest uppercase transition-all duration-200 border border-[var(--theme-text)] text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
                    >
                        Read Blogs
                    </a>
                    <a
                        href="https://instagram.com/catchydham"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 text-sm font-mono tracking-widest uppercase transition-all duration-200 border border-[var(--theme-text)] text-[var(--theme-text)] hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
                    >
                        Instagram
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
