/**
 * Shared color utilities for generating accessible color combinations
 * and managing color transitions throughout the application.
 */

/* Helper to convert HSL to Hex */
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
 * Generates a "Smart" random theme using Color Theory.
 * Ensures contrast and aesthetic harmony constraints.
 */
export const generateRandomColors = () => {
    // 1. Pick a random base Hue (0-360)
    const baseHue = Math.floor(Math.random() * 360);

    // 2. Decide Mode (Dark, Midnight, Light)
    // Weighted: 40% Dark, 40% Midnight, 20% Light
    const modeRoll = Math.random();
    let mode = 'dark'; // 'dark' | 'midnight' | 'light'
    if (modeRoll > 0.8) mode = 'light';
    else if (modeRoll > 0.4) mode = 'midnight';

    let bg, text, accent, secondary;

    // 3. Generate Colors based on Mode
    if (mode === 'light') {
        // Light Mode: High Lightness (90-98%), Low Saturation (0-20%)
        const bgS = Math.floor(Math.random() * 20); // 0-20%
        const bgL = 90 + Math.floor(Math.random() * 9); // 90-99%
        bg = hslToHex(baseHue, bgS, bgL);

        // Text: Very Dark version of same hue or neutral
        text = hslToHex(baseHue, 10, 15); // Almost black

        // Secondary: Slightly darker version of BG
        secondary = hslToHex(baseHue, bgS, bgL - 10);
    } else if (mode === 'midnight') {
        // Midnight Mode: Very Dark Blue/Purple/Cool tones
        // Force hue to cool range if random roll wants "true midnight" vibe
        // or just let it be any deep color. Let's keep baseHue for variety.
        const bgS = 20 + Math.floor(Math.random() * 30); // 20-50% sat
        const bgL = 2 + Math.floor(Math.random() * 8);   // 2-10% lightness
        bg = hslToHex(baseHue, bgS, bgL);

        // Text: High lightness
        text = hslToHex(baseHue, 10, 95);

        // Secondary: Slightly lighter version of BG
        secondary = hslToHex(baseHue, bgS, bgL + 10);
    } else {
        // Standard Dark Mode: Neutral darks
        const bgS = Math.floor(Math.random() * 15); // 0-15% sat (desaturated)
        const bgL = 5 + Math.floor(Math.random() * 10);  // 5-15% lightness
        bg = hslToHex(baseHue, bgS, bgL);

        // Text: White-ish
        text = hslToHex(baseHue, 5, 90);

        // Secondary: Lighter gray/tint
        secondary = hslToHex(baseHue, bgS, bgL + 12);
    }

    // 4. Generate Accent
    // Complementary (180deg) or Triadic (+120/-120) or Analogous
    const accentStrategy = Math.random();
    let accentHue;
    if (accentStrategy < 0.5) accentHue = (baseHue + 180) % 360; // Complementary
    else if (accentStrategy < 0.8) accentHue = (baseHue + 120) % 360; // Triadic
    else accentHue = (baseHue + 30) % 360; // Analogous

    // Accent needs high saturation to pop
    // In light mode, accent can be med-dark. In dark mode, accent needs to be bright.
    let accentL = 50;
    if (mode === 'light') accentL = 40 + Math.floor(Math.random() * 20); // 40-60%
    else accentL = 60 + Math.floor(Math.random() * 20); // 60-80% (bright)

    accent = hslToHex(accentHue, 80 + Math.floor(Math.random() * 20), accentL);

    return {
        name: `Generated ${mode} ${baseHue}`, // Optional name for debugging
        backgroundColor: bg,
        textColor: text,
        accentColor: accent,
        secondaryColor: secondary
    };
};

/* Keep a refined list of starter themes just for the initial default state if needed, 
   but the generator handles the rest. */
export const PREMIUM_THEMES = [
    { name: 'Deep Midnight', backgroundColor: '#0f172a', textColor: '#f8fafc', accentColor: '#38bdf8', secondaryColor: '#1e293b' }
];
