import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../services/authService";
import { auth } from "../firebase";

const Navbar = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogoClick = () => {
    if (user) {
      navigate("/courses");
    } else {
      navigate("/");
    }
  };

  const isCoursesPage = location.pathname === "/courses";
  const isRunningSessionPage = location.pathname === "/running-session";
  const isDashboardPage = location.pathname === "/dashboard";
  const isHelpPage = location.pathname === "/help";

  const getPageTitle = () => {
    if (isRunningSessionPage) return " - Running Session";
    if (isCoursesPage) return " - Current Courses";
    if (isDashboardPage) return " - Dashboard";
    if (isHelpPage) return " - Help";
    return "";
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      style={{
        background: "linear-gradient(to right, #1a237e, #283593)",
        padding: "1rem 2rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
          }}
          onClick={handleLogoClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/IpBeep/IPBeep_White.png"
            alt="IPBeep Logo"
            style={{
              height: "45px",
              width: "auto",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.h1
              style={{
                color: "#ffffff",
                margin: 0,
                fontSize: "1.75rem",
                fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.5px",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              IPBeep{getPageTitle()}
            </motion.h1>
          </motion.div>
        </motion.div>

        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {!isCoursesPage && user && (
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#3949ab" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/courses")}
              style={{
                backgroundColor: "#303f9f",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "12px",
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                ← Back to Courses
              </motion.span>
            </motion.button>
          )}
          {user && (
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#d32f2f" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              style={{
                backgroundColor: "#c62828",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "12px",
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 500,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Logout
              </motion.span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
