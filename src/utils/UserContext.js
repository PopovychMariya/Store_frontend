import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './Auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            axios.get('/api/accounts/view/', {
                headers: { Authorization: `Token ${token}` }
            })
            .then(response => {
                setUser(response.data.user.user_type);
            })
            .catch(() => {
                setUser(null);
            });
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);