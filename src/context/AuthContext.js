import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [jwt, setJwt] = useState(null);

  const login = (id, jwt ) => {
    setIsSignedIn(true);
    setUserId(id);
    setJwt(jwt);
  };

  const logout = () => {
    setIsSignedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, userId, login, logout, jwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
