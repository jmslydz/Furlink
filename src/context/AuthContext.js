import React, {createContext, useState, useEffect, useContext} from 'react';

const DEMO_USER = {
  uid: 'demo-user-001',
  email: 'admin',
  displayName: 'Admin',
};

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(null);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email, password) => {
    if (!email || !password) return {success: false, error: 'Username and password are required'};
    if (email.toLowerCase().trim() === 'admin' && password === '1234') {
      setUser(DEMO_USER);
      return {success: true};
    }
    await new Promise((r) => setTimeout(r, 600));
    return {success: false, error: 'Invalid username or password. Try admin / 1234'};
  };

  const signUp = async (email, password, displayName) => {
    if (!email || !password || !displayName) return {success: false, error: 'All fields are required'};
    if (password.length < 6) return {success: false, error: 'Password must be at least 6 characters'};
    await new Promise((r) => setTimeout(r, 800));
    setUser({uid: `user-${Date.now()}`, email, displayName});
    return {success: true};
  };

  const signOutUser = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, loading, signIn, signUp, signOut: signOutUser, isOffline, setIsOffline}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
