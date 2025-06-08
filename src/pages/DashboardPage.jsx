import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import PieChart from '../components/PieChart';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { getAttendanceData } from '../services/attendanceService';
import ModifyAttendanceModal from '../components/ModifyAttendanceModal';

const DashboardPage = () => {
  const { colors } = useTheme();
  const location = useLocation();
  const { course, section, startTime, endTime, sessionId } = location.state || {};
  
  const [stats, setStats] = useState([
    { label: 'Total Students', value: 0 },
    { label: 'IP Address Confirmed Students', value: 0 },
    { label: 'Face-recognition Confirmed Students', value: 0 },
    { label: 'Number of Verified Attendees', value: 0 },
  ]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);

  const fetchAttendanceData = async () => {
    if (!course || !section || !sessionId) {
      setError('Missing required session information');
      setLoading(false);
      return;
    }

    try {
      const data = await getAttendanceData(course, section, sessionId);
      
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      
      setStats([
        { label: 'Total Students', value: data.totalStudents },
        { label: 'IP Address Confirmed Students', value: data.ipConfirmed },
        { label: 'Face-recognition Confirmed Students', value: data.faceConfirmed },
        { label: 'Number of Verified Attendees', value: data.verifiedAttendees },
      ]);
      
      setAbsentStudents(data.absentStudents);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Failed to fetch attendance data. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [course, section, sessionId, retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryCount(prev => prev + 1);
  };

  // Format the start time
  const formattedStartTime = startTime ? new Date(startTime).toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : 'N/A';

  // Format the end time
  const formattedEndTime = endTime ? new Date(endTime).toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : 'N/A';

  // Data for the Pie Chart
  const pieChartData = {
    labels: ['Attended', 'Absent'],
    datasets: [
      {
        data: [stats[3].value, stats[0].value - stats[3].value],
        backgroundColor: [
          colors.primary,
          colors.textSecondary,
        ],
        borderColor: [
          colors.cardBackground,
          colors.cardBackground,
        ],
        borderWidth: 2,
      },
    ],
  };

  // Options for the Pie Chart (can be customized further)
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows controlling size with parent div
    plugins: {
      legend: {
        position: 'top', // Or 'bottom', 'left', 'right'
        labels: {
          color: colors.text, // Legend text color
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} students`;
          }
        }
      }
    },
  };

  return (
    <div style={{
      backgroundColor: colors.background,
      fontFamily: "'Outfit', sans-serif",
      minHeight: '100vh',
    }}>
      <Navbar course={course} section={section} />
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px',
        paddingTop: '84px',
        paddingBottom: '64px',
      }}>
        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
            <button
              onClick={handleRetry}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#c62828',
                color: 'white',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#b71c1c'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#c62828'}
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px'
          }}>
            <div style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #1a237e',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite'
            }} />
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        ) : (
          <>
            {/* Session Details */}
            {course && section && startTime && (
              <div style={{
                backgroundColor: colors.cardBackground,
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                padding: 24,
                marginBottom: 24,
                fontFamily: "'Outfit', sans-serif",
                color: colors.text,
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: colors.text }}>
                    Session Details
                  </h2>
                  <div style={{
                    display: 'flex',
                    gap: '12px'
                  }}>
                    <button
                      onClick={() => window.print()}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#1a237e',
                        color: 'white',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = '#283593'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = '#1a237e'}
                    >
                      Print Report
                    </button>
                    <button
                      onClick={() => setIsModifyModalOpen(true)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid #1a237e',
                        backgroundColor: 'transparent',
                        color: '#1a237e',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = '#f5f7ff';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Modify Manually
                    </button>
                  </div>
                </div>
                <p style={{ margin: '8px 0 0 0', fontSize: '1rem', color: colors.textSecondary }}>
                  <span style={{ fontWeight: 600 }}>Course:</span> {course.toUpperCase()} Session {section}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '1rem', color: colors.textSecondary }}>
                  <span style={{ fontWeight: 600 }}>Start Time:</span> {formattedStartTime}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '1rem', color: colors.textSecondary }}>
                  <span style={{ fontWeight: 600 }}>End Time:</span> {formattedEndTime}
                </p>
              </div>
            )}
            
            {/* Stats Cards */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{
                  flex: '1 1 200px',
                  backgroundColor: colors.cardBackground,
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  padding: 24,
                  transition: 'all 0.3s ease-in-out',
                  marginBottom: 0,
                  cursor: 'pointer',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'}
                >
                  <div>
                    <span style={{
                      color: '#546e7a',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 500,
                      display: 'block',
                      marginBottom: 8
                    }}>{stat.label}</span>
                    <span style={{
                      fontWeight: 700,
                      fontFamily: "'Outfit', sans-serif",
                      color: '#1a237e',
                      fontSize: 32
                    }}>{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {/* Left Column */}
              <div style={{ flex: '1 1 300px', minWidth: 300 }}>
                <div style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  marginBottom: 24,
                  padding: 24,
                  height: '100%',
                  cursor: 'pointer',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'}
                >
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    color: '#1a237e',
                    marginBottom: 16,
                    display: 'block',
                    fontSize: 20
                  }}>Percentage of Attendance</span>
                  <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PieChart data={pieChartData} options={pieChartOptions} />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div style={{ flex: '3 1 600px', minWidth: 300 }}>
                <div style={{ 
                  backgroundColor: colors.cardBackground, 
                  borderRadius: 16, 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
                  padding: 24, 
                  height: '100%', 
                  cursor: 'pointer' 
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'}
                >
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    color: '#1a237e',
                    marginBottom: 16,
                    display: 'block',
                    fontSize: 20
                  }}>List of Absent Students</span>
                  <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                    {absentStudents.map((name) => (
                      <li key={name} style={{
                        borderRadius: 8,
                        transition: 'all 0.2s ease-in-out',
                        fontFamily: "'Outfit', sans-serif",
                        color: '#546e7a',
                        padding: '8px 0 8px 8px',
                        marginBottom: 4,
                        fontSize: 16,
                        cursor: 'pointer',
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = '#f5f7ff'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = ''}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <ModifyAttendanceModal
        isOpen={isModifyModalOpen}
        onClose={() => {
          setIsModifyModalOpen(false);
          fetchAttendanceData(); // Refresh data after closing modal
        }}
        courseId={course}
        sessionId={sessionId}
      />
    </div>
  );
};

export default DashboardPage; 