/**
 * Shared color utilities for generating accessible color combinations
 * and managing color transitions throughout the application.
 */

/**
 * Generates a random color pair (background and text) that meets WCAG AA contrast requirements.
 * @returns {Object} Object containing backgroundColor, textColor, and accentColor as hex strings
 */
export const generateRandomColors = () => {
    const generateRandomColor = () =>
        `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")}`;

    const getContrastRatio = (color1, color2) => {
        const luminance = (color) => {
            const rgb = parseInt(color.slice(1), 16);
            const r = (rgb >> 16) & 0xff;
            const g = (rgb >> 8) & 0xff;
            const b = (rgb >> 0) & 0xff;
            // Convert to relative luminance using WCAG formula
            const [rr, gg, bb] = [r, g, b].map((c) => {
                const s = c / 255;
                return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
        };
        const l1 = luminance(color1);
        const l2 = luminance(color2);
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    };

    let backgroundColor;
    let textColor;
    let accentColor;

    do {
        backgroundColor = generateRandomColor();
        textColor = generateRandomColor();
    } while (getContrastRatio(backgroundColor, textColor) < 7); // WCAG AAA: 7:1 ratio

    // Generate a random accent color (no contrast requirement for accent)
    accentColor = generateRandomColor();

    return { backgroundColor, textColor, accentColor };
};
