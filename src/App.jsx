import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage'; // Re-import DashboardPage
import CoursesPage from './pages/CoursesPage'; // Import CoursesPage
import HelpPage from './pages/HelpPage';
// import Navbar from './components/Navbar'; // Assuming Navbar is not global anymore based on previous changes
// import SettingsNav from './components/SettingsNav'; // Assuming SettingsNav is not global

function App() {
  return (
    <ThemeProvider>
      {/* Assuming Navbar is now part of DashboardPage */}
      {/* <Navbar /> */}
      {/* Assuming SettingsNav is now part of DashboardPage */}
      {/* <SettingsNav /> */}
      <div className="App">
        <Routes>
          {/* Sign In is the initial page */}
          <Route path="/" element={<SignInPage />} />
          {/* After Sign In, go to Courses */}
          <Route path="/courses" element={<CoursesPage />} />
          {/* After starting a session on Courses, go to Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Keep help page or modify path if needed */}
          <Route path="/help" element={<HelpPage />} /> {/* Or change path if desired */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
