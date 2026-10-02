export default function AboutSection() {
    return (
        <section id="about" className="mb-12 scroll-mt-6">
            <h2 className="font-[Verdana,sans-serif] text-xl font-bold mb-4">About</h2>
            <div className="space-y-3 text-[var(--theme-text-muted)]">
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
        </section>
    );
}
