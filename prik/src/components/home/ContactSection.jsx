import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

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
                <h2 className="text-3xl lg:text-4xl font-bold mb-12">Get in Touch</h2>
                <a
                    href="mailto:prinovac@gmail.com"
                    className="text-xl transition-colors mb-8 inline-block text-[var(--theme-text)] hover:opacity-80"
                >
                    prinovac@gmail.com
                </a>
                <div className="flex gap-6 items-center justify-center text-2xl mt-8 text-[var(--theme-text-muted)]">
                    <a href="https://github.com/prik73" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-text)]">
                        <FaGithub />
                    </a>
                    <a href="https://twitter.com/prik73" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-text)]">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com/catchydham" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-text)]">
                        <FaInstagram />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
