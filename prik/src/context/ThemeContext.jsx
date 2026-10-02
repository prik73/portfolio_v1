import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Same palette as blog.doof.love
const themes = {
    light: { backgroundColor: '#ffffff', textColor: '#000000', link: '#000099', border: '#000000' },
    dark: { backgroundColor: '#1a1a1a', textColor: '#e8e8e8', link: '#8cb4f5', border: '#555555' },
};

const readSaved = () => {
    try {
        return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    } catch {
        return 'light';
    }
};

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(readSaved);

    useEffect(() => {
        try {
            localStorage.setItem('theme', mode);
        } catch { /* storage unavailable */ }
    }, [mode]);

    const toggleTheme = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));
    const themeColor = themes[mode];

    return (
        <ThemeContext.Provider value={{ themeColor, mode, toggleTheme, randomizeTheme: toggleTheme }}>
            <div
                style={{
                    backgroundColor: themeColor.backgroundColor,
                    color: themeColor.textColor,
                    '--theme-bg': themeColor.backgroundColor,
                    '--theme-text': themeColor.textColor,
                    '--theme-text-muted': mode === 'dark' ? '#b8b8b8' : '#333333',
                    '--theme-border': themeColor.border,
                    '--theme-surface': themeColor.backgroundColor,
                    '--theme-inverse-bg': themeColor.textColor,
                    '--theme-inverse-text': themeColor.backgroundColor,
                    '--theme-accent': themeColor.textColor,
                    '--theme-secondary': themeColor.backgroundColor,
                    '--theme-tertiary': themeColor.textColor,
                    '--theme-link': themeColor.link,
                    minHeight: '100vh',
                    transition: 'background-color 0.3s ease, color 0.3s ease'
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
