import React from 'react';
import { useTheme } from '../context/ThemeContext';

const HelpPage = () => {
  const { colors } = useTheme();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      padding: '24px',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: colors.cardBackground,
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}>
        <h1 style={{
          color: colors.text,
          marginBottom: '24px',
        }}>
          Help Center
        </h1>
        <div style={{
          color: colors.textSecondary,
          lineHeight: '1.6',
        }}>
          <h2 style={{ color: colors.text, marginBottom: '16px' }}>Frequently Asked Questions</h2>
          <p>This is a placeholder for the help content. Add your FAQ and support information here.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 