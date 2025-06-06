import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

const notifications = [
  'Sara Nassar has disconnected from WiFi connection.',
  'Omar Hamdi has confirmed his attendance.',
  'Lina Kamal has reconnected to the WiFi connection.',
  'Ahmed Darwish has confirmed his attendance.',
  'Nour Hassan has disconnected from WiFi connection.',
];

const NotificationsPanel = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          color: '#1a237e',
          mb: 2
        }}
      >
        Notifications
      </Typography>
      <List sx={{ 
        maxHeight: 'calc(100vh - 300px)', 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f5f7ff',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#e8eaf6',
          borderRadius: '4px',
          '&:hover': {
            background: '#c5cae9',
          },
        },
      }}>
        {notifications.map((notification, index) => (
          <React.Fragment key={index}>
            <ListItem 
              sx={{ 
                py: 1.5,
                borderRadius: '8px',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#f5f7ff',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <ListItemText 
                primary={notification}
                primaryTypographyProps={{
                  variant: 'body2',
                  color: '#546e7a',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500
                }}
              />
            </ListItem>
            {index < notifications.length - 1 && (
              <Divider sx={{ my: 1, opacity: 0.5 }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NotificationsPanel;