import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Threshold in minutes for IP confirmation
const IP_CONFIRMATION_THRESHOLD = 30; // 30 minutes threshold

export const getAttendanceData = async (courseId, sectionId, sessionId) => {
  try {
    // Ensure courseId is capitalized
    const formattedCourseId = courseId.toUpperCase();
    console.log('\n=== SEARCH PARAMETERS ===');
    console.log('Searching for document with:', {
      course_id: formattedCourseId,
      session_id: sessionId
    });

    // Query FlatDesign collection for matching document
    const flatDesignRef = collection(db, 'FlatDesign');
    const flatDesignQuery = query(
      flatDesignRef,
      where('course_id', '==', formattedCourseId),
      where('session_id', '==', sessionId)
    );

    const flatDesignSnapshot = await getDocs(flatDesignQuery);
    console.log('\n=== FLAT DESIGN QUERY RESULTS ===');
    console.log('Query results:', {
      size: flatDesignSnapshot.size,
      docs: flatDesignSnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
    });

    let totalStudents = 0;
    let studentsData = {};
    let studentThresholds = {};

    if (!flatDesignSnapshot.empty) {
      const docData = flatDesignSnapshot.docs[0].data();
      console.log('\n=== FLAT DESIGN DOCUMENT DATA ===');
      console.log('Found document:', docData);

      if (docData.students) {
        studentsData = docData.students;
        totalStudents = Object.keys(studentsData).length;
        
        // Store thresholds for each student
        Object.entries(studentsData).forEach(([studentId, studentData]) => {
          studentThresholds[studentId] = studentData.threshold || 45; // Default to 45 if not specified
          console.log(`Student ${studentId} threshold:`, studentThresholds[studentId]);
        });
        
        console.log('Number of students found:', totalStudents);
        console.log('Student IDs:', Object.keys(studentsData));
        console.log('All student thresholds:', studentThresholds);
      } else {
        console.warn('No students data found in document');
      }
    } else {
      console.warn('No matching document found');
    }
    
    // Process attendance data
    const attendanceData = {
      totalStudents,
      ipConfirmed: 0,
      faceConfirmed: 0,
      verifiedAttendees: 0,
      absentStudents: []
    };

    // Get all student IDs who attended
    const attendedStudentIds = new Set();

    // Process each student's data directly from FlatDesign
    console.log('\n=== PROCESSING STUDENT ATTENDANCE ===');
    Object.entries(studentsData).forEach(([studentId, studentData]) => {
      const totalMinutes = studentData.total_minutes || 0;
      const threshold = studentData.threshold || 45;
      const isIpConfirmed = totalMinutes >= threshold;
      const isFaceConfirmed = studentData.face === true;
      const isAttended = studentData.attended === true;

      console.log(`\nStudent ${studentId}:`, {
        name: studentData.name,
        totalMinutes,
        threshold,
        isIpConfirmed,
        isFaceConfirmed,
        isAttended,
        comparison: `${totalMinutes} >= ${threshold} = ${isIpConfirmed}`
      });

      if (isIpConfirmed) {
        attendanceData.ipConfirmed++;
        console.log(`✅ Student ${studentId} IP confirmed with ${totalMinutes} minutes (threshold: ${threshold})`);
      } else {
        console.log(`❌ Student ${studentId} NOT confirmed: ${totalMinutes} minutes < ${threshold} threshold`);
      }

      if (isFaceConfirmed) {
        attendanceData.faceConfirmed++;
        console.log(`✅ Student ${studentId} face confirmed`);
      }

      if (isAttended) {
        attendanceData.verifiedAttendees++;
        console.log(`✅ Student ${studentId} marked as attended`);
        attendedStudentIds.add(studentId);
      }
    });

    // Get absent students
    console.log('\n=== PROCESSING ABSENT STUDENTS ===');
    Object.entries(studentsData).forEach(([studentId, studentData]) => {
      if (!attendedStudentIds.has(studentId)) {
        attendanceData.absentStudents.push(studentData.name || studentData.student_name);
        console.log(`Student ${studentId} marked as absent`);
      }
    });

    console.log('\n=== FINAL ATTENDANCE DATA ===', attendanceData);
    return attendanceData;
  } catch (error) {
    console.error('Error in getAttendanceData:', error);
    return {
      totalStudents: 0,
      ipConfirmed: 0,
      faceConfirmed: 0,
      verifiedAttendees: 0,
      absentStudents: [],
      error: error.message
    };
  }
}; 