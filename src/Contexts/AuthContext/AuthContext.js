import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user data
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            // If user data exists in local storage, parse it and set the user state
            const userData = JSON.parse(storedUserData);
            setUser(userData);
        }
        setIsLoading(false);
    }, []);


    // Function to update the user state
    const login = (userData) => {
        setUser(userData);
        // You might want to store the user data in localStorage or manage tokens here
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        // Clear user data from localStorage or invalidate tokens
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
