import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Pages & Components
import AuthPage from "./pages/AuthPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";

import Home from "./pages/Home";
import Profile from "./pages/Profile"; 
import ProfileDetails from "./pages/ProfileDetails";

import ShimmerLoading from "./components/ShimmerLoading";

import { SocketProvider } from "./context/SocketContext";
import { useAuthSynchronization } from "./customHooks/useAuthSynchronization";



function App() {

    useAuthSynchronization()

const { loading , isAuthenticated} = useSelector((state) => state.user);

    // Showing skeletal screen while loading to avoid while UI flashes
    if (loading) {
        return <ShimmerLoading type="fullscreen" />;
    }

return (
    <SocketProvider>
        <Routes>
                {/* 1. PROTECTED ROUTE CHANNELS (Require Authentication) */}
                <Route 
                    path="/" 
                    element={isAuthenticated ? <Home /> : <Navigate to="/auth" replace />} 
                />
                <Route 
                    path="/profile" 
                    element={isAuthenticated ? <Profile /> : <Navigate to="/auth" replace />} 
                />
                <Route 
                path="/profiledetails"
                element={ isAuthenticated ? <ProfileDetails/> : <Navigate to='/auth' replace /> }
                />

                {/* 2. PUBLIC ROUTE CHANNELS (Require Guest Status) */}
                <Route 
                    path="/auth" 
                    element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" replace />} 
                />
                <Route 
                    path="/verify-otp" 
                    element={!isAuthenticated ? <VerifyOtpPage /> : <Navigate to="/" replace />} 
                />

                {/* 3.this FALLBACK REDIRECT */}
                <Route 
                    path="*" 
                    element={<Navigate to={isAuthenticated ? "/" : "/auth"} replace />} 
                />
            </Routes>

        </SocketProvider>
    );
}




export default App;



