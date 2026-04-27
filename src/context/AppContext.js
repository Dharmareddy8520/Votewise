import React, { createContext, useContext, useState, useEffect } from 'react';
import { initSession } from '../services/firebase';
import { getUserProfile } from '../services/firestore';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const authUser = await initSession();
        setUser(authUser);
        if (authUser) {
          const userProfile = await getUserProfile(authUser.uid);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error("Failed to initialize session:", error);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      const userProfile = await getUserProfile(user.uid);
      setProfile(userProfile);
    }
  };

  const logout = async () => {
    try {
      const { getAuth, signOut } = await import('firebase/auth');
      const { app } = await import('../services/firebase');
      const auth = getAuth();
      await signOut(auth);
      setUser(null);
      setProfile(null);
      // Wait for re-auth
      const newUser = await initSession();
      setUser(newUser);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider value={{ user, profile, loading, refreshProfile, logout }}>
      {children}
    </AppContext.Provider>
  );
};
