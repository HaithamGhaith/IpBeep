import React from 'react';
import { useTheme } from '../context/ThemeContext';
// Assuming chart.js and react-chartjs-2 are installed
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, options }) => {
  const { colors } = useTheme();

  return (
    <div style={{
      backgroundColor: colors.cardBackground,
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      padding: '24px',
      fontFamily: "'Outfit', sans-serif",
      color: colors.text,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // minHeight: '300px', // Example styling, adjust as needed
    }}>
      {/* Placeholder for the actual Pie Chart component */}
      {/* You would integrate the Pie component from react-chartjs-2 here */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart; 