import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#f5f7ff';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#1a1a1a' : '#f5f7ff',
      cardBackground: isDarkMode ? '#2d2d2d' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#1a237e',
      textSecondary: isDarkMode ? '#b0b0b0' : '#546e7a',
      border: isDarkMode ? '#404040' : '#e0e0e0',
      inputBackground: isDarkMode ? '#404040' : '#f8f9fa',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
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