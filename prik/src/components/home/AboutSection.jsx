import { motion } from 'framer-motion';

export default function AboutSection({ sectionsRef }) {
    return (
        <section
            ref={el => sectionsRef.current['about'] = el}
            data-section="about"
            className="min-h-screen flex flex-col justify-center py-20 border-t border-[var(--theme-border)]"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                    <span className="text-[var(--theme-text-muted)]">{'<'}</span>
                    About
                    <span className="text-[var(--theme-text-muted)]">{' />'}</span>
                </h2>

                <div className="space-y-4 text-lg leading-relaxed max-w-2xl text-[var(--theme-text-muted)]">
                    <p>
                        Started my B.Tech degree in 2022, diving headfirst into the world of programming.
                        By 2024, I was freelancing and building web applications that solve real problems.
                    </p>

                    <p>
                        I build backend systems that don't just work, they scale. From designing RESTful APIs
                        to optimizing database queries, I focus on writing code that's maintainable, performant,
                        and actually makes sense six months later.
                    </p>

                    <p>
                        Currently exploring microservices architecture, API design patterns, and database
                        optimization to build better systems.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
