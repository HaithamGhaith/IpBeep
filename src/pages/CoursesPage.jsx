import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import CourseCard from '../components/CourseCard';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [isLoading, setIsLoading] = useState(true);
  const [instructorCourses, setInstructorCourses] = useState([]);

  // State for hover effects on course cards
  const [hoveredCard, setHoveredCard] = useState(null);
  // State to store the selected course for the modal
  const [selectedCourse, setSelectedCourse] = useState(null);
  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for session details
  const [sessionNumber, setSessionNumber] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the instructor document from Firestore
          const instructorDoc = await getDoc(doc(db, 'instructors', user.uid));
          
          if (instructorDoc.exists()) {
            // If instructor document exists, get the data
            const instructorData = instructorDoc.data();
            console.log('Instructor data:', instructorData);
            
            // Set the instructor's name from the data
            setUserName(instructorData.name || 'User');
            
            // Get courses array from instructor data and ensure uniqueness
            if (instructorData.courses && Array.isArray(instructorData.courses)) {
              // Use a Set to filter out duplicate course IDs
              const uniqueCourses = [...new Set(instructorData.courses)];
              setInstructorCourses(uniqueCourses);
            } else {
              setInstructorCourses([]);
            }
          } else {
            console.log('No instructor document found for user');
            // If no instructor document found, fallback to email
            setUserName(user.email?.split('@')[0] || 'User');
            setInstructorCourses([]);
          }
        } catch (error) {
          console.error('Error fetching instructor data:', error);
          setUserName('User');
          setInstructorCourses([]);
        }
      } else {
        console.log('No user is signed in');
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleMouseOver = (cardId) => setHoveredCard(cardId);
  const handleMouseOut = () => setHoveredCard(null);

  // Handler for clicking on a course card
  const handleCourseCardClick = (courseId) => {
    console.log('Selected course:', courseId);
    setSelectedCourse(courseId);
  };

  // Handlers for modal control
  const openModal = () => {
    if (selectedCourse) { // Only open modal if a course is selected
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null); // Deselect course when modal is closed
  };

  const handleStartSession = async () => {
    console.log('Attempting to start session...');
    if (selectedCourse && sessionNumber && sessionDuration) {
      try {
        // Data to write to Firestore
        const sessionConfigData = {
          course_id: selectedCourse.toUpperCase(),
          session_id: sessionNumber,
          threshold_minutes: parseInt(sessionDuration, 10),
        };

        console.log('Writing session config to Firestore document "details":', sessionConfigData);
        // Set the data in the document with ID "details" in the "Session_config" collection
        await setDoc(doc(db, 'Session_config', 'details'), sessionConfigData);
        console.log('Document "details" successfully written/updated.');

        const startTime = new Date().toISOString();
        console.log('Navigating to /runningsession...');
        navigate('/runningsession', { 
          state: { 
            course: selectedCourse, 
            section: sessionNumber, 
            startTime: startTime,
            sessionDuration: sessionDuration
          } 
        });
        closeModal();
      } catch (error) {
        console.error('Error writing document to Firestore: ', error);
        // Optionally show an error message to the user
        alert(`Failed to start session: ${error.message}`); // Add an alert for immediate feedback
      }
    } else {
      console.log('Cannot start session: missing selectedCourse, sessionNumber, or sessionDuration.');
      // Optionally inform the user that they need to select all fields
      alert('Please select a course, session number, and duration.');
    }
  };

  // Styles for the course cards, with hover and selected effect
  const getCourseCardStyle = (cardId) => ({
    backgroundColor: colors.cardBackground,
    borderRadius: '16px',
    boxShadow: hoveredCard === cardId
      ? '0 8px 30px rgba(0,0,0,0.1)'
      : selectedCourse === cardId
        ? '0 4px 25px rgba(0,0,0,0.1)' // Slightly different shadow for selected
        : '0 4px 20px rgba(0,0,0,0.05)', // Default shadow
    padding: '24px',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer', // Indicate interactivity
    border: selectedCourse === cardId 
      ? '3px solid #1a237e' // Using a specific color for the border
      : '1px solid transparent', // Default transparent border
    transform: hoveredCard === cardId ? 'translateY(-5px)' : 'translateY(0)', // Slight lift on hover
    outline: selectedCourse === cardId ? '2px solid rgba(26, 35, 126, 0.4)' : 'none', // Add a subtle outline for selected card
  });

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Outfit', sans-serif",
      }}>
        <h2 style={{ color: colors.text }}>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      fontFamily: "'Outfit', sans-serif",
    }}>
      <Navbar isCoursesPage={true} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px',
        paddingTop: '84px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              color: colors.text,
              fontSize: '1.8rem',
              margin: 0,
            }}>
            Welcome back, {userName}!
          </h2>

          {selectedCourse && (
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}>
              <select
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.inputBackground,
                  color: colors.text,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1rem',
                }}
                value={sessionNumber}
                onChange={(e) => setSessionNumber(e.target.value)}
              >
                <option value="">Select Session</option>
                {[...Array(50)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
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

              <button
                onClick={handleStartSession}
                disabled={!sessionNumber || !sessionDuration}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: sessionNumber && sessionDuration ? '#1a237e' : '#e0e0e0',
                  color: sessionNumber && sessionDuration ? 'white' : '#9e9e9e',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1rem',
                  cursor: sessionNumber && sessionDuration ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={e => {
                  if (sessionNumber && sessionDuration) {
                    e.currentTarget.style.backgroundColor = '#283593';
                  }
                }}
                onMouseOut={e => {
                  if (sessionNumber && sessionDuration) {
                    e.currentTarget.style.backgroundColor = '#1a237e';
                  }
                }}
              >
                Start Session
              </button>
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {instructorCourses.length > 0 ? (
            instructorCourses.map((courseId) => (
              <div
                key={courseId}
                style={getCourseCardStyle(courseId.toLowerCase())}
                onMouseOver={() => handleMouseOver(courseId.toLowerCase())}
                onMouseOut={handleMouseOut}
                onClick={() => handleCourseCardClick(courseId.toLowerCase())}
              >
                <CourseCard courseId={courseId} />
              </div>
            ))
          ) : (
            <div style={{
              ...getCourseCardStyle('no-courses'),
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '48px',
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '1.2rem',
                color: colors.text,
                marginBottom: '16px',
              }}>
                There are no courses for {userName} yet!
              </h3>
              <p style={{
                color: colors.textSecondary,
                fontSize: '1rem',
              }}>
                Please contact your administrator to add courses to your account.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage; 