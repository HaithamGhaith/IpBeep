import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const ModifyAttendanceModal = ({ isOpen, onClose, courseId, sessionId }) => {
  const { colors } = useTheme();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!isOpen) return;
      
      try {
        const q = query(
          collection(db, 'FlatDesign'),
          where('course_id', '==', courseId.toUpperCase()),
          where('session_id', '==', sessionId)
        );
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          if (docData.students) {
            const studentsList = Object.entries(docData.students).map(([id, data]) => ({
              id,
              name: data.name || data.student_name,
              attended: data.attended || false
            }));
            setStudents(studentsList);
          }
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [isOpen, courseId, sessionId]);

  const handleToggleAttendance = async (studentId) => {
    try {
      const q = query(
        collection(db, 'FlatDesign'),
        where('course_id', '==', courseId.toUpperCase()),
        where('session_id', '==', sessionId)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = doc(db, 'FlatDesign', querySnapshot.docs[0].id);
        const newStudents = { ...querySnapshot.docs[0].data().students };
        newStudents[studentId].attended = !newStudents[studentId].attended;
        
        await updateDoc(docRef, { students: newStudents });
        
        // Update local state
        setStudents(prevStudents => 
          prevStudents.map(student => 
            student.id === studentId 
              ? { ...student, attended: !student.attended }
              : student
          )
        );
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: colors.cardBackground,
        borderRadius: '16px',
        padding: '24px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            margin: 0,
            color: colors.text,
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 600
          }}>
            Modify Attendance
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: colors.textSecondary,
              padding: '4px'
            }}
          >
            ×
          </button>
        </div>

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
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
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {students.map(student => (
              <div
                key={student.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: student.attended ? '#e8f5e9' : '#ffebee',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <span style={{
                  color: student.attended ? '#2e7d32' : '#c62828',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500
                }}>
                  {student.name}
                </span>
                <label style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '50px',
                  height: '24px'
                }}>
                  <input
                    type="checkbox"
                    checked={student.attended}
                    onChange={() => handleToggleAttendance(student.id)}
                    style={{
                      opacity: 0,
                      width: 0,
                      height: 0
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: student.attended ? '#4caf50' : '#e0e0e0',
                    transition: '.4s',
                    borderRadius: '24px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '20px',
                      width: '20px',
                      left: '2px',
                      bottom: '2px',
                      backgroundColor: 'white',
                      transition: '.4s',
                      borderRadius: '50%',
                      transform: student.attended ? 'translateX(26px)' : 'translateX(0)'
                    }} />
                  </span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyAttendanceModal; 