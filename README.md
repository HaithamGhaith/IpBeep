# 🌐 IpBeep - Smart Attendance System Web Interface

IpBeep is a modern web application that serves as the instructor's control panel for managing smart attendance sessions. Built with React and Firebase, it provides a seamless interface for course management, session control, and attendance analytics.

## 🔧 Features

### 📚 Course Management
- Create and manage multiple courses
- View course statistics and attendance history
- Real-time session monitoring
- Beautiful course cards with interactive animations

### 🎯 Session Control
- Start and end attendance sessions
- Configure session parameters (duration, threshold)
- Real-time attendance tracking
- Automatic Wi-Fi network setup (SSID: `IpBeep-Network`)
- Secure password generation for network access

### 📊 Analytics Dashboard
- Visual attendance statistics
- Interactive pie charts for attendance overview
- Detailed student presence tracking
- Session history and reports

### 🔐 Security
- Firebase Authentication integration
- Secure session management
- Protected routes and API endpoints
- Real-time data synchronization

## 🛠 Technical Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Chart.js
- **Backend**: Firebase
  - Authentication
  - Firestore Database
  - Real-time Updates
- **Deployment**: Vercel/Netlify

## 📦 Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── assets/            # Static assets
└── App.jsx           # Main application component
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/IpBeep-Web.git
cd IpBeep-Web
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
- Create a Firebase project
- Enable Authentication and Firestore
- Add your Firebase configuration to `.env`

4. **Start development server**
```bash
npm run dev
```

## 🔄 Integration with Raspberry Pi

The web application works in conjunction with the [IpBeep Raspberry Pi system](https://github.com/HaithamGhaith/IpBeep-PI-Side):

1. **Session Configuration**
   - Instructor creates a session through the web interface
   - Configuration is stored in Firebase
   - Raspberry Pi fetches configuration and starts the session

2. **Attendance Tracking**
   - Students connect to the Pi's Wi-Fi network
   - Face recognition and MAC tracking begin
   - Real-time updates are pushed to Firebase
   - Web interface displays live attendance data

3. **Session Completion**
   - Instructor ends the session through the web interface
   - Pi finalizes attendance logs
   - Data is synchronized to Firebase
   - Analytics are updated in real-time

## 📱 Features in Detail

### Course Management
- Create new courses with unique identifiers
- View course statistics and history
- Manage multiple sections
- Track attendance patterns

### Session Control
- Start/stop attendance sessions
- Configure session parameters
- Monitor real-time attendance
- Generate secure Wi-Fi passwords

### Analytics
- Visual attendance statistics
- Student presence tracking
- Session history
- Export capabilities

## 🔒 Security Features

- Firebase Authentication
- Protected routes
- Secure session management
- Real-time data validation
- Encrypted communications

## 🎨 UI/UX Features

- Modern, responsive design
- Smooth animations and transitions
- Interactive data visualizations
- Intuitive navigation
- Dark/Light mode support

## 📈 Firebase Structure

### Collections

1. **courses**
   - Course information
   - Section details
   - Statistics

2. **sessions**
   - Session configuration
   - Attendance data
   - Timestamps

3. **users**
   - Instructor profiles
   - Authentication data
   - Permissions

## 🚀 Deployment

1. **Build the application**
```bash
npm run build
```

2. **Deploy to Vercel/Netlify**
- Connect your repository
- Configure environment variables
- Deploy

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Haitham Ghaith - Initial work

## 🙏 Acknowledgments

- Firebase team for the amazing platform
- React community for the excellent tools
- All contributors who have helped shape this project

---

Built with ❤️ for better education
