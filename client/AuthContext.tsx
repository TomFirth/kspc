import React, { createContext, useState, useContext } from 'react';

// Define the shape of your authentication context
type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap the app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
