import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { useUser } from './UserContext';

const ProtectedCustomerRoute = ({ children, allowedRoles }) => {
    const { token } = useAuth();
    const { user } = useUser();

    if (!token || !allowedRoles.includes(user)) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedCustomerRoute;