import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../components/App';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import ErrorPage from '../components/ErrorPage';
import AuthProvider from '../contexts/AuthContext';
import SignUp from '../components/SignUp';
import LogIn from '../components/Login';
import ForgotPassword from '../components/ForgotPassword';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
import PrivateRoute from '../components/PrivateRoute';

const AppRouter = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/dashboard" element={<PrivateRoute><App /></PrivateRoute>} >
                        <Route index element={<Dashboard />} />
                        <Route path="add" element={<AddTask />} />
                        <Route path="edit">
                            <Route path=":id" element={<EditTask />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default AppRouter;