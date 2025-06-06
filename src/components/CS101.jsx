import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import { useState } from 'react';

const CS101 = ({ title }) => {
  const { colors } = useTheme(); // Use the theme

  // State to store random data, generated only once on mount
  const [courseData] = useState(() => ({
    totalRegisteredStudents: Math.floor(Math.random() * 100) + 50, // Random between 50 and 149
    sectionCounts: Math.floor(Math.random() * 5) + 1, // Random between 1 and 5
    numberOfGivenSessions: Math.floor(Math.random() * 20) + 5, // Random between 5 and 24
    avgClassDuration: (Math.random() * (90 - 30) + 30).toFixed(0), // Random between 30 and 90 mins
    avgAttendedStudents: Math.floor(Math.random() * 40) + 30, // Random between 30 and 69
  }));

  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      color: colors.text, // Apply text color from theme
    }}>
      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600,
        fontSize: '1.2rem',
        marginBottom: '16px',
        color: colors.text, // Ensure heading color is also from theme
      }}>
        {title}
      </h3>
      {/* Replace paragraph with a table */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '16px',
      }}>
        <tbody>
          <tr style={{
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <td style={{ padding: '8px 0', fontWeight: 500, color: colors.textSecondary }}>Total Registered Students:</td>
            <td style={{ padding: '8px 0', textAlign: 'right', color: colors.text }}>{courseData.totalRegisteredStudents}</td>
          </tr>
          <tr style={{
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <td style={{ padding: '8px 0', fontWeight: 500, color: colors.textSecondary }}>Section Counts:</td>
            <td style={{ padding: '8px 0', textAlign: 'right', color: colors.text }}>{courseData.sectionCounts}</td>
          </tr>
          <tr style={{
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <td style={{ padding: '8px 0', fontWeight: 500, color: colors.textSecondary }}>Number of Given Sessions:</td>
            <td style={{ padding: '8px 0', textAlign: 'right', color: colors.text }}>{courseData.numberOfGivenSessions}</td>
          </tr>
          <tr style={{
            borderBottom: `1px solid ${colors.border}`,
          }}>
            <td style={{ padding: '8px 0', fontWeight: 500, color: colors.textSecondary }}>Avg Class Duration:</td>
            <td style={{ padding: '8px 0', textAlign: 'right', color: colors.text }}>{courseData.avgClassDuration} mins</td>
          </tr>
          <tr>{/* No bottom border for the last row */}
            <td style={{ padding: '8px 0', fontWeight: 500, color: colors.textSecondary }}>Avg Attended Students:</td>
            <td style={{ padding: '8px 0', textAlign: 'right', color: colors.text }}>{courseData.avgAttendedStudents}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CS101; 