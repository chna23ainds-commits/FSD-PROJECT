import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
    blue: {
        primary: '#667eea',
        primaryDark: '#764ba2',
        secondary: '#f093fb',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b'
    },
    green: {
        primary: '#10b981',
        primaryDark: '#059669',
        secondary: '#6ee7b7',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b'
    },
    purple: {
        primary: '#a855f7',
        primaryDark: '#7c3aed',
        secondary: '#d8b4fe',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b'
    }
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [themeColor, setThemeColorState] = useState('blue');

    useEffect(() => {
        const savedDark = localStorage.getItem('darkMode');
        const savedTheme = localStorage.getItem('themeColor');

        if (savedDark) setIsDark(JSON.parse(savedDark));
        if (savedTheme) setThemeColorState(savedTheme);

        // Apply to document
        if (savedDark && JSON.parse(savedDark)) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        localStorage.setItem('darkMode', JSON.stringify(newDark));

        if (newDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const setThemeColor = (color) => {
        if (themes[color]) {
            setThemeColorState(color);
            localStorage.setItem('themeColor', color);
        }
    };

    return (
        <ThemeContext.Provider value={{
            isDark,
            toggleDarkMode,
            themeColor,
            setThemeColor,
            colors: themes[themeColor] || themes.blue
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
