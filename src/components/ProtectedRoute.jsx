import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (!user) {
        navigate("/", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isAuthenticated === null) {
    // Still checking authentication status
    return null;
  }

  if (!isAuthenticated) {
    // Not authenticated, redirect to login
    return <Navigate to="/" replace />;
  }

  // Authenticated, render children
  return children;
};

export default ProtectedRoute;
