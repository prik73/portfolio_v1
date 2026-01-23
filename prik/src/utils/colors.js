/**
 * Advanced color utilities for generating accessible, visually appealing color combinations
 * with proper contrast ratios and harmonious color relationships.
 */

/* ============================================================================
   COLOR CONVERSION UTILITIES
   ============================================================================ */

/**
 * Converts HSL color values to hexadecimal format
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Hex color string (e.g., "#ffffff")
 */
const hslToHex = (h, s, l) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

/**
 * Converts hexadecimal color to HSL values
 * @param {string} hex - Hex color string (e.g., "#ffffff")
 * @returns {Object} Object with h (0-360), s (0-100), l (0-100)
 */
const hexToHSL = (hex) => {
  const rgb = parseInt(hex.slice(1), 16);
  let r = ((rgb >> 16) & 0xff) / 255;
  let g = ((rgb >> 8) & 0xff) / 255;
  let b = ((rgb >> 0) & 0xff) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

/**
 * Converts RGB values to hexadecimal format
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} Hex color string
 */
const rgbToHex = (r, g, b) => {
  const clamp = (val) => Math.max(0, Math.min(255, Math.round(val)));
  return `#${clamp(r).toString(16).padStart(2, "0")}${clamp(g)
    .toString(16)
    .padStart(2, "0")}${clamp(b).toString(16).padStart(2, "0")}`;
};

/* ============================================================================
   COLOR ANALYSIS UTILITIES
   ============================================================================ */

/**
 * Calculates the relative luminance of a color according to WCAG standards
 * @param {string} color - Hex color string
 * @returns {number} Relative luminance (0-1)
 */
const getLuminance = (color) => {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const [rr, gg, bb] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
};

/**
 * Calculates contrast ratio between two colors according to WCAG standards
 * @param {string} color1 - First hex color string
 * @param {string} color2 - Second hex color string
 * @returns {number} Contrast ratio (1-21)
 */
const getContrastRatio = (color1, color2) => {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/**
 * Determines if a color is considered "light" based on luminance
 * @param {string} hexColor - Hex color string
 * @returns {boolean} True if light, false if dark
 */
const isLightColor = (hexColor) => {
  return getLuminance(hexColor) > 0.5;
};

/* ============================================================================
   COLOR GENERATION UTILITIES
   ============================================================================ */

/**
 * Adjusts the lightness of a color while maintaining hue and saturation
 * @param {string} hexColor - Base hex color
 * @param {number} amount - Amount to adjust lightness (-100 to 100)
 * @returns {string} Adjusted hex color
 */
const adjustLightness = (hexColor, amount) => {
  const hsl = hexToHSL(hexColor);
  const newL = Math.max(0, Math.min(100, hsl.l + amount));
  return hslToHex(hsl.h, hsl.s, newL);
};

/**
 * Creates a darker or lighter variant based on the base color's lightness
 * @param {string} hexColor - Base hex color
 * @param {number} intensity - How much to adjust (0-20 recommended)
 * @returns {string} Variant hex color
 */
const createVariant = (hexColor, intensity = 10) => {
  const hsl = hexToHSL(hexColor);
  const adjustment = hsl.l > 50 ? -intensity : intensity;
  return adjustLightness(hexColor, adjustment);
};

/**
 * Generates a complementary color (180° on color wheel)
 * @param {string} hexColor - Base hex color
 * @returns {string} Complementary hex color
 */
const getComplementary = (hexColor) => {
  const hsl = hexToHSL(hexColor);
  const newH = (hsl.h + 180) % 360;
  return hslToHex(newH, hsl.s, hsl.l);
};

/**
 * Generates an analogous color (±30° on color wheel)
 * @param {string} hexColor - Base hex color
 * @param {number} offset - Degrees to offset (default ±30)
 * @returns {string} Analogous hex color
 */
const getAnalogous = (hexColor, offset = 30) => {
  const hsl = hexToHSL(hexColor);
  const direction = Math.random() > 0.5 ? 1 : -1;
  const newH = (hsl.h + offset * direction + 360) % 360;
  return hslToHex(newH, hsl.s, hsl.l);
};

/**
 * Generates a triadic color (120° or 240° on color wheel)
 * @param {string} hexColor - Base hex color
 * @returns {string} Triadic hex color
 */
const getTriadic = (hexColor) => {
  const hsl = hexToHSL(hexColor);
  const offset = Math.random() > 0.5 ? 120 : 240;
  const newH = (hsl.h + offset) % 360;
  return hslToHex(newH, hsl.s, hsl.l);
};

/* ============================================================================
   MAIN COLOR THEME GENERATOR
   ============================================================================ */

/**
 * Generates a complete, accessible color theme with harmonious relationships
 * @param {Object} options - Generation options
 * @param {number} options.minContrast - Minimum contrast ratio (default: 5)
 * @param {string} options.mode - Generation mode: 'vibrant', 'muted', 'pastel', 'dark', 'light'
 * @param {number} options.maxAttempts - Maximum generation attempts (default: 100)
 * @returns {Object} Complete color theme with background, text, accent, secondary, and tertiary colors
 */
export const generateRandomColors = (options = {}) => {
  const {
    minContrast = 5,
    mode = "vibrant",
    maxAttempts = 100,
  } = options;

  // Define color modes with specific HSL ranges
  const modes = {
    vibrant: {
      bgSaturation: [40, 85],
      bgLightness: [20, 80],
      textLightness: [0, 15, 85, 100], // Dark or light extremes
      accentSaturation: [70, 100],
      accentLightness: [45, 65],
    },
    muted: {
      bgSaturation: [15, 40],
      bgLightness: [30, 70],
      textLightness: [0, 20, 80, 100],
      accentSaturation: [40, 70],
      accentLightness: [40, 60],
    },
    pastel: {
      bgSaturation: [25, 50],
      bgLightness: [75, 95],
      textLightness: [0, 15],
      accentSaturation: [50, 80],
      accentLightness: [60, 75],
    },
    dark: {
      bgSaturation: [20, 60],
      bgLightness: [5, 25],
      textLightness: [85, 100],
      accentSaturation: [60, 95],
      accentLightness: [50, 70],
    },
    light: {
      bgSaturation: [20, 50],
      bgLightness: [85, 98],
      textLightness: [0, 20],
      accentSaturation: [60, 90],
      accentLightness: [40, 60],
    },
  };

  const config = modes[mode] || modes.vibrant;

  let backgroundColor, textColor;
  let attempts = 0;

  do {
    attempts++;
    
    // Generate background color
    const bgH = Math.floor(Math.random() * 360);
    const bgS =
      config.bgSaturation[0] +
      Math.floor(Math.random() * (config.bgSaturation[1] - config.bgSaturation[0]));
    const bgL =
      config.bgLightness[0] +
      Math.floor(Math.random() * (config.bgLightness[1] - config.bgLightness[0]));
    backgroundColor = hslToHex(bgH, bgS, bgL);

    // Generate text color with appropriate lightness
    const textH = Math.floor(Math.random() * 360);
    const textS = Math.floor(Math.random() * 100);
    
    // Choose extreme lightness for text
    const textL =
      Math.random() > 0.5
        ? config.textLightness[2] + Math.random() * (config.textLightness[3] - config.textLightness[2])
        : config.textLightness[0] + Math.random() * (config.textLightness[1] - config.textLightness[0]);
    
    textColor = hslToHex(textH, textS, textL);

    if (attempts >= maxAttempts) {
      // Fallback: force high contrast
      const bgIsLight = isLightColor(backgroundColor);
      textColor = bgIsLight ? "#000000" : "#ffffff";
      break;
    }
  } while (getContrastRatio(backgroundColor, textColor) < minContrast);

  // Generate accent color using triadic relationship
  const bgHSL = hexToHSL(backgroundColor);
  const accentOffset = Math.random() > 0.5 ? 120 : 240;
  const accentH = (bgHSL.h + accentOffset) % 360;
  const accentS =
    config.accentSaturation[0] +
    Math.floor(Math.random() * (config.accentSaturation[1] - config.accentSaturation[0]));
  const accentL =
    config.accentLightness[0] +
    Math.floor(Math.random() * (config.accentLightness[1] - config.accentLightness[0]));
  const accentColor = hslToHex(accentH, accentS, accentL);

  // Generate secondary color (subtle background variant)
  const secondaryColor = createVariant(backgroundColor, 8);

  // Generate tertiary color (analogous to accent)
  const tertiaryColor = getAnalogous(accentColor, 25);

  // Generate surface color (for cards/panels)
  const surfaceColor = createVariant(backgroundColor, isLightColor(backgroundColor) ? -5 : 5);

  // Generate border color (more subtle variant)
  const borderColor = createVariant(backgroundColor, isLightColor(backgroundColor) ? -12 : 12);

  return {
    backgroundColor,
    textColor,
    accentColor,
    secondaryColor,
    tertiaryColor,
    surfaceColor,
    borderColor,
    // Metadata
    contrast: getContrastRatio(backgroundColor, textColor).toFixed(2),
    mode,
    isLight: isLightColor(backgroundColor),
  };
};

/* ============================================================================
   TAILWIND UTILITIES
   ============================================================================ */

/**
 * Converts hex color to Tailwind background class
 * @param {string} hexColor - Hex color string
 * @returns {string} Tailwind class
 */
export const hexToTailwindBg = (hexColor) => `bg-[${hexColor}]`;

/**
 * Converts hex color to Tailwind text class
 * @param {string} hexColor - Hex color string
 * @returns {string} Tailwind class
 */
export const hexToTailwindText = (hexColor) => `text-[${hexColor}]`;

/**
 * Converts hex color to Tailwind border class
 * @param {string} hexColor - Hex color string
 * @returns {string} Tailwind class
 */
export const hexToTailwindBorder = (hexColor) => `border-[${hexColor}]`;

/**
 * Generates complete Tailwind class string for a theme
 * @param {Object} theme - Theme object from generateRandomColors
 * @returns {Object} Object with Tailwind classes for each color
 */
export const themeToTailwind = (theme) => ({
  background: hexToTailwindBg(theme.backgroundColor),
  text: hexToTailwindText(theme.textColor),
  accent: hexToTailwindBg(theme.accentColor),
  accentText: hexToTailwindText(theme.accentColor),
  secondary: hexToTailwindBg(theme.secondaryColor),
  tertiary: hexToTailwindBg(theme.tertiaryColor),
  surface: hexToTailwindBg(theme.surfaceColor),
  border: hexToTailwindBorder(theme.borderColor),
});

/* ============================================================================
   PREMIUM THEME PRESETS
   ============================================================================ */

export const PREMIUM_THEMES = [
  {
    name: "Midnight",
    backgroundColor: "#0a0a0a",
    textColor: "#ffffff",
    accentColor: "#3b82f6",
    secondaryColor: "#1a1a1a",
    tertiaryColor: "#60a5fa",
    surfaceColor: "#141414",
    borderColor: "#2a2a2a",
  },
  {
    name: "Ocean Breeze",
    backgroundColor: "#0c4a6e",
    textColor: "#f0f9ff",
    accentColor: "#22d3ee",
    secondaryColor: "#164e63",
    tertiaryColor: "#67e8f9",
    surfaceColor: "#155e75",
    borderColor: "#0e7490",
  },
  {
    name: "Forest Night",
    backgroundColor: "#14532d",
    textColor: "#f0fdf4",
    accentColor: "#4ade80",
    secondaryColor: "#166534",
    tertiaryColor: "#86efac",
    surfaceColor: "#15803d",
    borderColor: "#16a34a",
  },
  {
    name: "Royal Purple",
    backgroundColor: "#581c87",
    textColor: "#faf5ff",
    accentColor: "#c026d3",
    secondaryColor: "#6b21a8",
    tertiaryColor: "#d946ef",
    surfaceColor: "#7c3aed",
    borderColor: "#9333ea",
  },
  {
    name: "Sunset",
    backgroundColor: "#7c2d12",
    textColor: "#fff7ed",
    accentColor: "#fb923c",
    secondaryColor: "#9a3412",
    tertiaryColor: "#fdba74",
    surfaceColor: "#c2410c",
    borderColor: "#ea580c",
  },
  {
    name: "Arctic",
    backgroundColor: "#f0f9ff",
    textColor: "#0c4a6e",
    accentColor: "#0284c7",
    secondaryColor: "#e0f2fe",
    tertiaryColor: "#0ea5e9",
    surfaceColor: "#f8fafc",
    borderColor: "#cbd5e1",
  },
  {
    name: "Cherry Blossom",
    backgroundColor: "#fdf2f8",
    textColor: "#831843",
    accentColor: "#ec4899",
    secondaryColor: "#fce7f3",
    tertiaryColor: "#f472b6",
    surfaceColor: "#faf5ff",
    borderColor: "#f9a8d4",
  },
];

/* ============================================================================
   VALIDATION & UTILITIES
   ============================================================================ */

/**
 * Validates if a color combination meets accessibility standards
 * @param {string} bgColor - Background hex color
 * @param {string} fgColor - Foreground/text hex color
 * @param {string} level - WCAG level: 'AA' (4.5:1) or 'AAA' (7:1)
 * @returns {Object} Validation result with pass/fail and ratio
 */
export const validateAccessibility = (bgColor, fgColor, level = "AA") => {
  const ratio = getContrastRatio(bgColor, fgColor);
  const required = level === "AAA" ? 7 : 4.5;
  
  return {
    passes: ratio >= required,
    ratio: ratio.toFixed(2),
    required,
    level,
  };
};

/**
 * Finds the best text color (black or white) for a given background
 * @param {string} backgroundColor - Background hex color
 * @returns {string} Either "#000000" or "#ffffff"
 */
export const getBestTextColor = (backgroundColor) => {
  const whiteContrast = getContrastRatio(backgroundColor, "#ffffff");
  const blackContrast = getContrastRatio(backgroundColor, "#000000");
  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
};