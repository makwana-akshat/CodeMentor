import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth, useClerk } from '@clerk/clerk-react';
import apiClient, { setTokenProvider, setLogoutHandler } from '../services/api/client';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { isSignedIn, isLoaded: isAuthLoaded, getToken } = useAuth();
  const { signOut } = useClerk();
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

  // Inject auth handlers into global API client
  useEffect(() => {
    setTokenProvider(getToken);
    setLogoutHandler(() => signOut());
  }, [getToken, signOut]);

  // Sync user to backend on successful login
  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user && !hasSynced && !isSyncing) {
        try {
          setIsSyncing(true);
          await apiClient.post('/auth/sync', {
            email: user.primaryEmailAddress?.emailAddress || "",
            first_name: user.firstName || "",
            last_name: user.lastName || "",
            profile_image: user.imageUrl || ""
          });
          
        } catch (error) {
          console.error("Failed to sync user with backend:", error);
        } finally {
          setIsSyncing(false);
          setHasSynced(true);
        }
      }
    };
    
    syncUser();
  }, [isSignedIn, user, hasSynced, isSyncing, getToken]);

  const loading = !isUserLoaded || !isAuthLoaded || (isSignedIn && !hasSynced);

  const value = {
    user,
    isAuthenticated: !!isSignedIn,
    loading,
    logout: () => signOut(),
    refresh: () => {
      setHasSynced(false);
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
