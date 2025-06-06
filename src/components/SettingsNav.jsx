import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SettingsNav = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      padding: '16px',
      zIndex: 1000,
    }}>
      {/* Settings Icon Button */}
      <button
        onClick={toggleDropdown}
        style={{
          padding: '8px',
          borderRadius: '50%',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.cardBackground,
          color: colors.text,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
        }}
      >
        ⚙️
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '16px',
          backgroundColor: colors.cardBackground,
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minWidth: '200px',
          border: `1px solid ${colors.border}`,
        }}>
          {/* Language Selector */}
          <select 
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.inputBackground,
              color: colors.text,
              fontFamily: "'Outfit', sans-serif",
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>

          {/* Help Button */}
          <button
            onClick={() => {
              navigate('/help');
              setIsOpen(false);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.inputBackground,
              color: colors.text,
              fontFamily: "'Outfit', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '100%',
              textAlign: 'left',
            }}
          >
            Help
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.inputBackground,
              color: colors.text,
              fontFamily: "'Outfit', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '100%',
              textAlign: 'left',
            }}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsNav; 