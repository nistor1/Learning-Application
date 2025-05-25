import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const defaultUser = { logged: false, email: '', role: undefined, id: '' };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser
            ? JSON.parse(savedUser)
            : defaultUser;
    });

    const login = (email, isAdmin, id) => {
        let role;
        if (isAdmin === true) role = "TEACHER";
        else if (isAdmin === false) role = "STUDENT";
        else role = undefined;

        const loggedUser = { logged: true, email, role, id };
        setUser(loggedUser);
        localStorage.setItem('role', role);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        localStorage.setItem('id', id);
    };

    const logout = () => {
        setUser(defaultUser);
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
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
