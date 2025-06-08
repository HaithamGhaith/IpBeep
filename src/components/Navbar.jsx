import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SettingsButton from './SettingsButton';

const iconButtonStyle = {
  backgroundColor: '#f5f7ff',
  borderRadius: '12px',
  border: 'none',
  padding: 8,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  color: '#1a237e',
};

const Navbar = ({ course, section, isCoursesPage, isRunningSessionPage }) => {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const navbarTitle = isRunningSessionPage 
    ? ` - Running Session ${course ? course.toUpperCase() : ''}`
    : isCoursesPage 
      ? ' - Current Courses' 
      : course && section 
        ? ` - ${course.toUpperCase()} Session ${section} Report` 
        : ' - Dashboard - Report';

  return (
    <header style={{
      backgroundColor: colors.cardBackground,
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      borderBottom: '1px solid #e0e0e0',
      width: '100%',
      zIndex: 1201,
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 70,
          padding: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img 
              src="/IPBeep.png" 
              alt="IPbeep Logo" 
              style={{ height: 40, width: 40, objectFit: 'contain', marginRight: 10 }}
            />
            <span style={{
              color: '#1a237e',
              fontSize: '1.25rem',
              fontWeight: 700,
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: 1
            }}>
              IPBeep{navbarTitle}
            </span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 16
          }}>
            <button
              type="button"
              style={iconButtonStyle}
              onClick={() => navigate('/')}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#e8eaf6'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#f5f7ff'}
            >
              <LogoutIcon style={{ color: '#1a237e' }} />
            </button>
            <SettingsButton />
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#d0d0d0'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#e0e0e0'}
            >
              <AccountCircleIcon style={{ color: '#1a237e' }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;