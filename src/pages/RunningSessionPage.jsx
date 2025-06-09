import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const RunningSessionPage = () => {
  const { colors } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [generatedPassword, setGeneratedPassword] = useState("");
  const { course, section, startTime, sessionDuration, sessionId } =
    location.state || {};

  // Format the start time without seconds
  const formattedStartTime = startTime
    ? new Date(startTime).toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const handleEndSession = () => {
    const endTime = new Date().toISOString();
    navigate("/dashboard", {
      state: {
        course,
        section,
        startTime,
        sessionDuration,
        endTime,
        sessionId: section, // Use section number as sessionId
      },
    });
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        fontFamily: "'Outfit', sans-serif",
        color: colors.text,
      }}
    >
      <Navbar isRunningSessionPage={true} course={course} section={section} />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px",
          paddingTop: "84px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: "1.8rem",
              margin: 0,
              textAlign: "left",
            }}
          >
            Running Session
          </h2>
          <button
            onClick={handleEndSession}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#dc3545",
              color: "white",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#c82333")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#dc3545")
            }
          >
            End Session
          </button>
        </div>
        <div
          style={{
            backgroundColor: colors.cardBackground,
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            padding: "24px",
            fontFamily: "'Outfit', sans-serif",
            color: colors.text,
          }}
        >
          <p>Course: {course ? course.toUpperCase() : "N/A"}</p>
          <p>Session: {section || "N/A"}</p>
          <p>
            Duration: {sessionDuration ? `${sessionDuration} minutes` : "N/A"}
          </p>
          <p>Start Time: {formattedStartTime}</p>
          <p>
            The session is currently running, connect to the Wi-fi connection
            configured by the raspberry pi
          </p>

          <div
            style={{
              marginTop: "24px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 16px", fontSize: "1.2rem" }}>
              Network Information
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  backgroundColor: colors.background,
                  padding: "12px 16px",
                  borderRadius: "8px",
                  flex: 1,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    opacity: 0.9,
                    color: colors.text,
                  }}
                >
                  SSID
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: colors.primary,
                    fontFamily: "monospace",
                    letterSpacing: "0.5px",
                  }}
                >
                  IpBeep-Network
                </p>
              </div>
              <button
                onClick={generatePassword}
                style={{
                  backgroundColor: "#1b237e",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2a3496")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1b237e")
                }
              >
                Generate Password
              </button>
            </div>
            {generatedPassword && (
              <div
                style={{
                  marginTop: "16px",
                  backgroundColor: colors.background,
                  padding: "12px 16px",
                  borderRadius: "8px",
                }}
              >
                <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.9 }}>
                  Generated Password
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    color: colors.primary,
                  }}
                >
                  {generatedPassword}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunningSessionPage;
