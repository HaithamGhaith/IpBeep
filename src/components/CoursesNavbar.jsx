import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const CoursesNavbar = ({ openModal, closeModal, isModalOpen, selectedCourse }) => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  // Placeholder state for session details
  const [selectedClass, setSelectedClass] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');
  const [sessionNumber, setSessionNumber] = useState('');
  const [sessionCount, setSessionCount] = useState('');

  // State for hover effects on buttons
  const [hoveredButton, setHoveredButton] = useState(null);
  // State for hover effects on modal inputs
  const [isClassSelectHovered, setIsClassSelectHovered] = useState(false);
  const [isDurationSelectHovered, setIsDurationSelectHovered] = useState(false);
  const [isSessionInputHovered, setIsSessionInputHovered] = useState(false);

  const handleButtonMouseOver = (buttonId) => setHoveredButton(buttonId);
  const handleButtonMouseOut = () => setHoveredButton(null);

  const handleClassSelectMouseOver = () => setIsClassSelectHovered(true);
  const handleClassSelectMouseOut = () => setIsClassSelectHovered(false);

  const handleDurationSelectMouseOver = () => setIsDurationSelectHovered(true);
  const handleDurationSelectMouseOut = () => setIsDurationSelectHovered(false);

  const handleSessionInputMouseOver = () => setIsSessionInputHovered(true);
  const handleSessionInputMouseOut = () => setIsSessionInputHovered(false);

  const handleStartSession = () => {
    console.log('Starting session for course:', selectedCourse, { sessionNumber: sessionNumber, duration: sessionDuration });
    // Here you would add logic to start the session
    // Navigate to the dashboard after starting a session
    const startTime = new Date().toISOString(); // Get current time as ISO string
    navigate('/dashboard', { state: { course: selectedCourse, section: sessionNumber, startTime: startTime } }); // Pass course, section, and start time
    closeModal(); // Still close the modal after navigating
  };

  return (
    <header style={{
      backgroundColor: colors.cardBackground, // Using card background for a slightly different shade
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)', // Slightly different shadow
      width: '100%',
      zIndex: 1100, // Lower z-index than main navbar if needed
      position: 'fixed',
      top: 0,
      left: 0,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '12px 24px', // Adjust padding
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '60px', // Adjust height
      }}>
        {/* Courses Title and Logo Grouped */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <img
            src="/IPBeep.png" // Path to the logo in the public directory
            alt="IPBeep Logo"
            style={{
              height: '40px', // Adjust height as needed
              marginRight: '12px', // Space between logo and title
              objectFit: 'contain',
            }}
          />
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            color: colors.text,
            fontSize: '1.5rem', // Smaller font size for navbar
            margin: 0,
          }}>
            IPBeep - Current Courses
          </h1>
        </div>
        {/* Start Session Button */}
        <button
          onClick={openModal}
          disabled={!selectedCourse}
          onMouseOver={() => handleButtonMouseOver('start-session-btn')}
          onMouseOut={handleButtonMouseOut}
          style={{
            padding: '8px 16px', // Adjust padding
            backgroundColor: selectedCourse
              ? (hoveredButton === 'start-session-btn' ? '#0d134f' : '#1a237e') // Darker shade on hover when enabled
              : colors.buttonDisabled, // Greyed out when disabled
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.9rem', // Adjust font size
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            transform: hoveredButton === 'start-session-btn' ? 'translateY(-2px)' : 'translateY(0)', // Slight lift on hover
          }}
        >
          {selectedCourse ? `Start a new session - ${selectedCourse.toUpperCase()}` : 'Select a course to start a session'}
        </button>
      </div>

      {/* Modal Overlay - Same as before, moved here */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
        }}>
          {/* Modal Content */}
          <div style={{
            backgroundColor: colors.cardBackground,
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '90%',
            maxWidth: '400px',
          }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              color: colors.text,
              margin: 0,
              fontSize: '1.5rem',
            }}>
              Start New Session{selectedCourse && ` - ${selectedCourse.toUpperCase()}`}
            </h3>

            {/* Session Selection */}
            <label htmlFor="session-select" style={{
              fontFamily: "'Outfit', sans-serif",
              color: colors.text,
              fontSize: '1rem',
              fontWeight: 500,
            }}>
              Select Session
            </label>
            <select
              id="session-select"
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.inputBackground,
                color: colors.text,
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1rem',
              }}
              value={sessionNumber} // Using sessionNumber state for selected session
              onChange={(e) => setSessionNumber(e.target.value)}
            >
              <option value="">Select Session</option>
              {[...Array(10)].map((_, i) => ( // Example: sessions 1 to 10
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            {/* Duration Selection */}
            <label htmlFor="duration-select" style={{
              fontFamily: "'Outfit', sans-serif",
              color: colors.text,
              fontSize: '1rem',
              fontWeight: 500,
            }}>
              Select Duration
            </label>
            <select
              onMouseOver={handleDurationSelectMouseOver}
              onMouseOut={handleDurationSelectMouseOut}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: `1px solid ${isDurationSelectHovered ? colors.primary : colors.border}`,
                backgroundColor: colors.inputBackground,
                color: colors.text,
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1rem',
              }}
              value={sessionDuration}
              onChange={(e) => setSessionDuration(e.target.value)}
            >
              <option value="">Select Duration</option>
              {[...Array(60)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} min</option>
              ))}
            </select>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
            }}>
              <button
                onClick={closeModal}
                onMouseOver={() => handleButtonMouseOver('cancel-modal-btn')}
                onMouseOut={handleButtonMouseOut}
                style={{
                  padding: '10px 20px',
                  backgroundColor: hoveredButton === 'cancel-modal-btn' ? colors.inputBackgroundHover : colors.inputBackground, // Slightly different background on hover
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: hoveredButton === 'cancel-modal-btn' ? 'translateY(-2px)' : 'translateY(0)', // Slight lift on hover
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleStartSession}
                onMouseOver={() => handleButtonMouseOver('start-modal-btn')}
                onMouseOut={handleButtonMouseOut}
                style={{
                  padding: '10px 20px',
                  backgroundColor: hoveredButton === 'start-modal-btn' ? '#0d134f' : '#1a237e', // Darker shade on hover
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  transform: hoveredButton === 'start-modal-btn' ? 'translateY(-2px)' : 'translateY(0)', // Slight lift on hover
                }}
              >
                Start Session
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CoursesNavbar; 