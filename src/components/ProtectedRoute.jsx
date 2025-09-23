// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, authReady } = useAuth();

  // still initializing auth - show a simple loader
  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // if no user, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // user is authenticated -> render children
  return children;
}
