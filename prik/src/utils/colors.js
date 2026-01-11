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
    let bg, text;

    if (strategy < 0.5) {
        // Strategy 1: Dark & Neon (Cyberpunk/Antiwork style)
        // BG: Very dark, slight saturation
        const hue = random(0, 360);
        bg = hslToHex(hue, random(10, 30), random(4, 12));

        // Text: Complementary or Analogous, High Saturation, High Lightness
        const textHue = (hue + random(120, 240)) % 360;
        text = hslToHex(textHue, random(80, 100), random(85, 95));

    } else if (strategy < 0.8) {
        // Strategy 2: Light & Dark (Classic Clean)
        // BG: Very light, low saturation (Cream, Pale Blue, etc)
        const hue = random(0, 360);
        bg = hslToHex(hue, random(5, 40), random(90, 98));

        // Text: Dark, matching hue or neutral
        text = hslToHex(hue, random(10, 20), random(5, 15));

    } else {
        // Strategy 3: Bold/Vibrant Background (Pop Art)
        // BG: High saturation, medium lightness
        const hue = random(0, 360);
        bg = hslToHex(hue, random(60, 90), random(45, 60));

        // Text: White or Very Dark depending on luminance
        // Simple check: if L > 50 use dark, else white. 
        // Since we set L to 45-60, it varies. Let's force high contrast.
        // For simplicity in this specific vibrant range, pure white or pure black usually works best.
        // Let's rely on a simple logic:
        text = '#ffffff';
        // If we want to be safe, we could calculate luminance, but 
        // for this specific "Vibrant" bucket (L 45-60), white is often readable, 
        // but black (#000000) might be safer for the brighter/yellow ranges.
        // Let's just pick a very dark color for better ensuring contrast if lighter vibrant.
        if (bg > '#888888') { // extremely naive hex check, better to use the L value we just picked
            // actually we know the L is random(45, 60). 
            // If L > 50, prefer dark text.
        }
        // Let's refine Strategy 3 to be safer: "Deep & Vibrant"
        // Use deep vibrant BG, bright text
        bg = hslToHex(hue, random(70, 100), random(35, 45)); // Darker vibrant
        text = '#ffffff';
    }

    return { backgroundColor: bg, textColor: text };
};
