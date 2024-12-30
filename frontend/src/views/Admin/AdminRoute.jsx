// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/contextprovider'

const AdminRoute = ({ children }) => {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (user && user.role !== 'admin') {
        return <Navigate to="/user" />;
    }

    return children;
};

export default AdminRoute;