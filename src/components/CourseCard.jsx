import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CourseCard = ({ courseId }) => {
  const { colors } = useTheme();
  const [fetchedCourseData, setFetchedCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setNoData(false);
      setFetchedCourseData(null);

      try {
        const q = query(
          collection(db, 'FlatDesign'),
          where('course_id', '==', courseId.toUpperCase()) // Ensure matching case
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log(`No documents found for course_id: ${courseId}`);
          setNoData(true);
          setLoading(false);
          return;
        }

        let totalStudents = new Set();
        let sessionAttendancePercentages = []; // Array to store attendance percentage for each session
        let uniqueSessions = new Set();
        let thresholdSum = 0;
        let thresholdEntriesCount = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Processing document data:', data);

          // Check if 'students' map exists and is an object
          if (data.students && typeof data.students === 'object') {
            const sessionStudents = Object.keys(data.students);
            let sessionAttendedCount = 0;

            sessionStudents.forEach(studentIdKey => {
              totalStudents.add(studentIdKey);
              
              // Check attendance from the nested map
              if (data.students[studentIdKey] && data.students[studentIdKey].attended === true) {
                sessionAttendedCount++;
              }

              // Accumulate threshold from nested student map
              const studentThreshold = data.students[studentIdKey].threshold;
              if (typeof studentThreshold === 'number') {
                thresholdSum += studentThreshold;
                thresholdEntriesCount++;
              }
            });

            // Calculate attendance percentage for this session
            if (sessionStudents.length > 0) {
              const sessionAttendancePercentage = (sessionAttendedCount / sessionStudents.length) * 100;
              sessionAttendancePercentages.push(sessionAttendancePercentage);
              console.log(`Session ${data.session_id} attendance: ${sessionAttendancePercentage.toFixed(0)}%`);
            }
          }

          // Continue processing session_id as it seems to be top-level
          if (data.session_id) {
            uniqueSessions.add(data.session_id);
          }
        });

        const totalRegisteredStudents = totalStudents.size;
        const sectionsCount = uniqueSessions.size;
        const avgClassDuration = thresholdEntriesCount > 0 
          ? (thresholdSum / thresholdEntriesCount).toFixed(0) 
          : 0;

        // Calculate average attendance percentage across all sessions
        const avgAttendedPercentage = sessionAttendancePercentages.length > 0
          ? (sessionAttendancePercentages.reduce((sum, percentage) => sum + percentage, 0) / sessionAttendancePercentages.length).toFixed(0)
          : 0;

        console.log('Session attendance percentages:', sessionAttendancePercentages);
        console.log('Average attendance percentage:', avgAttendedPercentage);

        setFetchedCourseData({
          totalRegisteredStudents,
          avgAttendedPercentage,
          sectionsCount,
          avgClassDuration,
        });
      } catch (error) {
        console.error('Error fetching course details:', error);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]); // Re-run when courseId changes

  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      color: colors.text,
    }}>
      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600,
        fontSize: '1.2rem',
        marginBottom: '16px',
        color: colors.text,
      }}>
        {courseId}
      </h3>
      {loading && (
        <div style={{ color: colors.textSecondary, textAlign: 'center', padding: '20px' }}>
          Loading course data...
        </div>
      )}
      {(noData || !fetchedCourseData) && !loading && (
        <div style={{ color: colors.textSecondary, textAlign: 'center', padding: '20px' }}>
          No classes started yet for this course.
        </div>
      )}
      {fetchedCourseData && !loading && (
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
              <td style={{ padding: '8px 0', textAlign: 'right', color: colors.text }}>{fetchedCourseData.totalRegisteredStudents}</td>
            </tr>
            <tr style={{
              borderBottom: `1px solid ${colors.border}`,
            }}>
              <td style={{ padding: '8px 0', fontWeight: 500, color: colors.textSecondary }}>Number of Given Sessions:</td>
              <td style={{ padding: '8px 0', textAlign: 'right', color: colors.text }}>{fetchedCourseData.sectionsCount}</td>
            </tr>
            <tr style={{
              borderBottom: `1px solid ${colors.border}`,
            }}>
              <td style={{ padding: '8px 0', fontWeight: 500, color: colors.textSecondary }}>Avg Class Duration:</td>
              <td style={{ padding: '8px 0', textAlign: 'right', color: colors.text }}>{fetchedCourseData.avgClassDuration} mins</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 500, color: colors.textSecondary }}>Avg Attended Students (%):</td>
              <td style={{ padding: '8px 0', textAlign: 'right', color: colors.text }}>{fetchedCourseData.avgAttendedPercentage}%</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseCard;