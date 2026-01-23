import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateRandomColors, PREMIUM_THEMES } from '../utils/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeColor, setThemeColor] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('themeColor'));
        // Default to the first premium theme (Midnight) if no saved theme
        return saved || PREMIUM_THEMES[0];
    });

    const randomizeTheme = () => {
        const newTheme = generateRandomColors();
        setThemeColor(newTheme);
        localStorage.setItem('themeColor', JSON.stringify(newTheme));
    };

    // Listen for double-click, 'd', 'Ctrl', and 'Tab' key press
    useEffect(() => {
        const handleDoubleClick = () => randomizeTheme();
        const handleKeyPress = (e) => {
            if (e.key === 'f' || e.key === 'F' || e.key === 'Control') {
                randomizeTheme();
            }
        };

        document.addEventListener('dblclick', handleDoubleClick);
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('dblclick', handleDoubleClick);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ themeColor, randomizeTheme }}>
            <div
                style={{
                    backgroundColor: themeColor.backgroundColor,
                    color: themeColor.textColor,
                    '--theme-bg': themeColor.backgroundColor,
                    '--theme-text': themeColor.textColor,
                    '--theme-text-muted': themeColor.textColor + 'b3',
                    '--theme-border': themeColor.borderColor || themeColor.textColor + '33',
                    '--theme-surface': themeColor.surfaceColor || themeColor.backgroundColor,
                    '--theme-inverse-bg': themeColor.textColor,
                    '--theme-inverse-text': themeColor.backgroundColor,
                    '--theme-accent': themeColor.accentColor,
                    '--theme-secondary': themeColor.secondaryColor || themeColor.backgroundColor,
                    '--theme-tertiary': themeColor.tertiaryColor || themeColor.accentColor,
                    minHeight: '100vh',
                    transition: 'background-color 0.5s ease, color 0.5s ease'
                }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
