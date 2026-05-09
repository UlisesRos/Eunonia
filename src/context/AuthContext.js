// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import backendUrl from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }

        setLoading(false);

        const refreshUser = (token) => {
            if (!token) return;
            axios.get(`${backendUrl}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => {
                const freshUser = res.data;
                localStorage.setItem('user', JSON.stringify(freshUser));
                setUser(freshUser);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    setUser(null);
                    setToken(null);
                }
            });
        };

        // Refresh inmediato al cargar
        refreshUser(storedToken);

        // Refresh periódico cada 10 minutos para reflejar cambios del admin
        const intervalId = setInterval(() => {
            refreshUser(localStorage.getItem('token'));
        }, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const login = (userData, tokenData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenData);
        setUser(userData);
        setToken(tokenData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
