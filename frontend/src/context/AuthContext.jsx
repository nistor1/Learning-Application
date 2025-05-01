import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser
            ? JSON.parse(savedUser)
            : { logged: false, email: '', role: '', token: '', id: '' };
    });

    const login = (email, role, token, id) => {
        const loggedUser = { logged: true, email, role, token , id};
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
    };

    const logout = () => {
        const defaultUser = { logged: false, email: '', role: '', token: '' , id: ''};
        setUser(defaultUser);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('id');

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
