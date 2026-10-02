const points = [
    "Started engineering in 2022, finished it in 2026.",
    "We can eat food and ice creams together, professionally and personally.",
    "I am trying to live in the moment  .",
    "I read books sometimes, and ponder on them mostly.",
    "love obscure memes, music of Sigur Rós, Chitra ji, NFAK, mr. jagjit uncle, history of technology, and etymology.",
    "Though I have very surface knowledge of everything.",
];

export default function AboutSection() {
    return (
        <section id="about" className="mb-12 scroll-mt-6">
            <h2 className="font-[Verdana,sans-serif] text-xl font-bold mb-4">About</h2>
            <ul className="space-y-1 text-[var(--theme-text-muted)]">
                {points.map((point) => (
                    <li key={point} className="flex gap-3">
                        <span aria-hidden="true">–</span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
