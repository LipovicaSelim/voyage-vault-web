import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => setHasTimedOut(true), 10000);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading && !hasTimedOut) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || hasTimedOut) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
