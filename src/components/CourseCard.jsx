import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const CourseCard = ({ courseId, isSelected, onClick, isHovered }) => {
  const { colors } = useTheme();
  const [fetchedCourseData, setFetchedCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      setNoData(false);
      setFetchedCourseData(null);

      try {
        const sessionsRef = collection(db, "FlatDesign");
        const q = query(
          sessionsRef,
          where("course_id", "==", courseId.toUpperCase())
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setNoData(true);
          setLoading(false);
          return;
        }

        const sessions = querySnapshot.docs.map((doc) => doc.data());
        const totalRegisteredStudents = new Set();
        let totalThresholdSum = 0;
        let totalThresholdCount = 0;
        let totalAttended = 0;
        let totalSessions = sessions.length;

        sessions.forEach((session) => {
          if (session.students && typeof session.students === "object") {
            Object.entries(session.students).forEach(
              ([studentId, studentData]) => {
                totalRegisteredStudents.add(studentId);

                // Add threshold to sum if it exists and is a number
                if (
                  studentData.threshold &&
                  typeof studentData.threshold === "number"
                ) {
                  totalThresholdSum += studentData.threshold;
                  totalThresholdCount++;
                }

                if (studentData.attended === true) {
                  totalAttended++;
                }
              }
            );
          }
        });

        // Calculate average threshold only if we have valid threshold values
        const avgClassDuration =
          totalThresholdCount > 0
            ? Math.round(totalThresholdSum / totalThresholdCount)
            : 0;

        const avgAttendedPercentage =
          totalSessions > 0 && totalRegisteredStudents.size > 0
            ? Math.round(
                (totalAttended /
                  (totalRegisteredStudents.size * totalSessions)) *
                  100
              )
            : 0;

        setFetchedCourseData({
          totalRegisteredStudents: totalRegisteredStudents.size,
          sectionsCount: totalSessions,
          avgClassDuration,
          avgAttendedPercentage,
        });
      } catch (error) {
        console.error("Error fetching course data:", error);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#1a237e"
        glarePosition="all"
        glareBorderRadius="16px"
      >
        <motion.div
          style={{
            backgroundColor: isSelected ? "#f5f7ff" : "#ffffff",
            borderRadius: "16px",
            boxShadow: isHovered
              ? "0 8px 30px rgba(0,0,0,0.1)"
              : isSelected
              ? "0 4px 25px rgba(0,0,0,0.1)"
              : "0 4px 20px rgba(0,0,0,0.05)",
            padding: "24px",
            cursor: "pointer",
            border: isSelected ? "3px solid #1a237e" : "1px solid transparent",
            transform: isHovered ? "translateY(-5px)" : "translateY(0)",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={onClick}
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              color: "#1a237e",
              fontSize: "1.5rem",
              fontWeight: 600,
              margin: 0,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {courseId}
          </motion.h3>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                color: colors.textSecondary,
                textAlign: "center",
                padding: "20px",
              }}
            >
              Loading course data...
            </motion.div>
          )}

          {(noData || !fetchedCourseData) && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                color: colors.textSecondary,
                textAlign: "center",
                padding: "20px",
              }}
            >
              No classes started yet for this course.
            </motion.div>
          )}

          {fetchedCourseData && !loading && (
            <motion.table
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "16px",
              }}
            >
              <tbody>
                <motion.tr
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: 500,
                      color: colors.textSecondary,
                    }}
                  >
                    Total Registered Students:
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      textAlign: "right",
                      color: colors.text,
                    }}
                  >
                    {fetchedCourseData.totalRegisteredStudents}
                  </td>
                </motion.tr>
                <motion.tr
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: 500,
                      color: colors.textSecondary,
                    }}
                  >
                    Number of Given Sessions:
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      textAlign: "right",
                      color: colors.text,
                    }}
                  >
                    {fetchedCourseData.sectionsCount}
                  </td>
                </motion.tr>
                <motion.tr
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: 500,
                      color: colors.textSecondary,
                    }}
                  >
                    Avg Class Duration:
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      textAlign: "right",
                      color: colors.text,
                    }}
                  >
                    {fetchedCourseData.avgClassDuration} mins
                  </td>
                </motion.tr>
                <motion.tr
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: 500,
                      color: colors.textSecondary,
                    }}
                  >
                    Avg Attended Students (%):
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      textAlign: "right",
                      color: colors.text,
                    }}
                  >
                    {fetchedCourseData.avgAttendedPercentage}%
                  </td>
                </motion.tr>
              </tbody>
            </motion.table>
          )}
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

export default CourseCard;
