/**
 * Generates a random integer between min and max (inclusive)
 */
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Converts HSL to Hex
 */
const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

/**
 * Generates a visually pleasing random theme
 * Strategies:
 * 1. Dark & Neon (Dark desaturated BG, Neon bright Text)
 * 2. Light & Bold (Pale BG, Dark bold Text)
 * 3. Vibrant & Deep (Vibrant BG, Dark/White Text)
 */
export const generateRandomColors = () => {
    const strategy = Math.random();
    let bg, text, accent;

    if (strategy < 0.5) {
        // Strategy 1: Dark & Neon (Cyberpunk/Antiwork style)
        // BG: Very dark, slight saturation
        const hue = random(0, 360);
        bg = hslToHex(hue, random(10, 30), random(4, 12));

        // Text: Complementary or Analogous, High Saturation, High Lightness
        const textHue = (hue + random(120, 240)) % 360;
        text = hslToHex(textHue, random(80, 100), random(85, 95));

        // Accent: A third distinct color (e.g., split complementary)
        const accentHue = (textHue + 30) % 360;
        accent = hslToHex(accentHue, 100, 60);

    } else if (strategy < 0.8) {
        // Strategy 2: Light & Dark (Classic Clean)
        // BG: Very light, low saturation (Cream, Pale Blue, etc)
        const hue = random(0, 360);
        bg = hslToHex(hue, random(5, 40), random(90, 98));

        // Text: Dark, matching hue or neutral
        text = hslToHex(hue, random(10, 20), random(5, 15));

        // Accent: Vibrant version of the main hue or complementary
        accent = hslToHex((hue + 180) % 360, 70, 50);

    } else {
        // Strategy 3: Deep & Vibrant
        // Use deep vibrant BG, bright text
        const hue = random(0, 360);
        bg = hslToHex(hue, random(70, 100), random(35, 45)); // Darker vibrant
        text = '#ffffff';

        // Accent: Bright contrasting color (e.g., yellow/cyan/magenta against deep bg)
        accent = hslToHex((hue + 60) % 360, 100, 70);
    }

    return { backgroundColor: bg, textColor: text, accentColor: accent };
};
