import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const logout = async (navigate) => {
  try {
    // Sign out from Firebase
    await signOut(auth);
    
    // Clear any stored data
    localStorage.clear();
    sessionStorage.clear();
    
    // Replace the current history entry with the login page
    // This prevents going back to authenticated pages
    navigate('/', { replace: true });
    
    // Force reload the page to clear any cached state
    window.location.reload();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}; 