
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function ContactSection({ sectionsRef }) {
    return (
        <section
            ref={el => sectionsRef.current['contact'] = el}
            className="min-h-screen flex flex-col justify-center py-20 border-t border-[var(--theme-border)] text-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl lg:text-4xl font-bold mb-8">Get in Touch</h2>
                <div className="max-w-2xl mx-auto mb-10 text-[var(--theme-text-muted)] space-y-4">
                    <p>
                        If you have any comments or feedback regarding my projects, or this very page,
                        or just want to say <span className="text-[var(--theme-accent)] font-semibold">Hi / Namaste :)</span>,
                        you can use any of the platforms below.
                    </p>
                    <p>Would love to hear from you!</p>
                </div>

                <a
                    href="mailto:prinovac@gmail.com"
                    className="text-xl lg:text-2xl font-semibold transition-all mb-8 inline-block text-[var(--theme-text)] hover:text-[var(--theme-accent)] hover:tracking-wide"
                >
                    prinovac@gmail.com
                </a>
                <div className="flex gap-6 items-center justify-center text-2xl mt-4 text-[var(--theme-text-muted)]">
                    <a href="https://github.com/prik73" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-text)]">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/prik73/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-text)]">
                        <FaLinkedin />
                    </a>
                    <a href="https://twitter.com/prik73" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-text)]">
                        <FaXTwitter />
                    </a>
                    <a href="https://instagram.com/catchydham" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-text)]">
                        <FaInstagram />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
