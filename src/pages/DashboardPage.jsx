import React from 'react';
import { useTheme } from '../context/ThemeContext';
import PieChart from '../components/PieChart';
import NotificationsPanel from '../components/NotificationsPanel';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

const stats = [
  { label: 'Total Students', value: 100 },
  { label: 'IP Address Confirmed Students', value: 50 },
  { label: 'Face-recognition Confirmed Students', value: 36 },
  { label: 'Number of Verified Attendees', value: 29 },
];

const absentStudents = [
  'Sophia Bennett', 'Ethan Caldwell', 'Olivia Harper', 'Mason Rivera',
  'Isabella Hayes', 'Jackson Brooks', 'Ava Morgan', 'Liam Spencer', 'Emily Foster'
];

const DashboardPage = () => {
  const { colors } = useTheme();
  const location = useLocation();
  const { course, section, startTime } = location.state || {}; // Get state from navigation, default to empty object if state is null

  // Format the start time
  const formattedStartTime = startTime ? new Date(startTime).toLocaleString() : 'N/A';

  // Data for the Pie Chart
  const pieChartData = {
    labels: ['Attended', 'Absent'],
    datasets: [
      {
        data: [stats[3].value, stats[0].value - stats[3].value], // Attended vs. Absent
        backgroundColor: [
          colors.primary, // Use primary color for attended
          colors.textSecondary, // Use secondary color for absent
        ],
        borderColor: [
          colors.cardBackground, // Border color for segments
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
        <div style={{
          // No extra margin-top or padding-top needed here because of padding on the outer div
        }}>
          {/* Header */}
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
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: colors.text }}>
                Session Details
              </h2>
              <p style={{ margin: '8px 0 0 0', fontSize: '1rem', color: colors.textSecondary }}>
                <span style={{ fontWeight: 600 }}>Course:</span> {course.toUpperCase()} Section {section}
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '1rem', color: colors.textSecondary }}>
                <span style={{ fontWeight: 600 }}>Start Time:</span> {formattedStartTime}
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
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', height: '100%' }}>
                <div style={{ flex: 1, minWidth: 250, backgroundColor: colors.cardBackground, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: 24, height: '100%', cursor: 'pointer' }}
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
                <div style={{ flex: 1, minWidth: 250, backgroundColor: colors.cardBackground, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: 24, height: '100%', cursor: 'pointer' }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'}
                >
                  <NotificationsPanel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 