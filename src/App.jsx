import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/signup/SignUp";
import Dashboard from "../src/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import { verifyAuth } from "./store/authSlice";

const AppContent = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      console.log("Initial Redux state:", { isAuthenticated, isLoading });
      dispatch(verifyAuth()).catch((err) =>
        console.error("Initial verifyAuth failed:", err)
      );
      hasInitialized.current = true;
    }
  }, [dispatch]);

  if (isLoading) {
    console.log("App is loading, waiting for auth...");
    return <div>Loading...</div>;
  }

  console.log("Current auth state:", { isAuthenticated, isLoading });

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectIfAuthenticated>
            <SignUp />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return <AppContent />;
}

export default App;
