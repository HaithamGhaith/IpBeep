import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
// import IPBeepLogo from '/IPBeep.png'; // Import the logo image

const SignInPage = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/courses'); // Navigate to the courses page after successful sign in
    } catch (error) {
      console.error('Sign in error:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('Failed to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // State for hover effects on inputs
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Outfit', sans-serif",
      padding: '24px',
    }}>
      <div style={{
        backgroundColor: colors.cardBackground,
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
      }}>
        <img 
          src="/IPBeep.png" 
          alt="IpBeep Logo" 
          style={{
            width: '180px',
            marginBottom: '32px',
          }}
        />
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          color: colors.text,
          fontSize: '2rem',
          marginBottom: '16px',
          marginTop: 0,
        }}>
          Sign In
        </h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          color: colors.textSecondary,
          fontSize: '1rem',
          marginBottom: '24px',
        }}>
          Sign in with your credentials
        </p>
        
        {error && (
          <div style={{
            color: '#dc3545',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            width: '100%',
            fontSize: '0.9rem',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} style={{ width: '100%' }}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '16px',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1rem',
              backgroundColor: colors.inputBackground,
              color: colors.text,
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '24px',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1rem',
              backgroundColor: colors.inputBackground,
              color: colors.text,
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
          />
          <button 
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isLoading ? '#6c757d' : '#1a237e',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage; 