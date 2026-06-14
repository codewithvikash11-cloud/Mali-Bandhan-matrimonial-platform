import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ID, Models } from 'appwrite';
import { account } from '../lib/appwrite';

// Check if Appwrite is fully configured
const isAppconfigured = () => {
  const projectId = (import.meta as any).env.VITE_APPWRITE_PROJECT_ID;
  return projectId && projectId !== 'placeholder_project_id' && projectId.trim() !== '';
};

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: 'Male' | 'Female';
  verified: boolean;
  premium: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  appwriteUser: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  error: string | null;
  isAppwriteActive: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (email: string, password: string, name: string, phone: string, gender: 'Male' | 'Female') => Promise<AuthUser>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [appwriteUser, setAppwriteUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isActive = isAppconfigured();

  // On mount, check if user session already exists
  useEffect(() => {
    const initSession = async () => {
      if (!isActive) {
        // Fallback Mock mode initialization
        const stored = localStorage.getItem('mali_auth_user');
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch (e) {
            localStorage.removeItem('mali_auth_user');
          }
        }
        setIsLoading(false);
        return;
      }

      try {
        const appwriteAcct = await account.get();
        setAppwriteUser(appwriteAcct);
        setUser({
          id: appwriteAcct.$id,
          name: appwriteAcct.name,
          email: appwriteAcct.email,
          phone: appwriteAcct.phone,
          verified: appwriteAcct.emailVerification,
          premium: false, // Default false until profile matched in db
        });
      } catch (err: any) {
        // Session not found is a normal flow for unauthenticated users
        console.log('Appwrite: No active user session.', err.message);
        setUser(null);
        setAppwriteUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, [isActive]);

  const login = async (email: string, password: string): Promise<AuthUser> => {
    setIsLoading(true);
    setError(null);

    if (!isActive) {
      // Mock Login Mode
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && password.length >= 6) {
            const mockUser: AuthUser = {
              id: 'mock-user-123',
              name: email.split('@')[0].toUpperCase(),
              email: email,
              phone: '+91 94142 68241',
              gender: 'Male',
              verified: true,
              premium: false,
            };
            localStorage.setItem('mali_auth_user', JSON.stringify(mockUser));
            setUser(mockUser);
            setIsLoading(false);
            resolve(mockUser);
          } else {
            setIsLoading(false);
            const errText = 'Invalid email or password (must be at least 6 characters).';
            setError(errText);
            reject(new Error(errText));
          }
        }, 800);
      });
    }

    try {
      // Create session in Appwrite
      await account.createEmailPasswordSession(email, password);
      const appwriteAcct = await account.get();
      setAppwriteUser(appwriteAcct);
      
      const loggedUser: AuthUser = {
        id: appwriteAcct.$id,
        name: appwriteAcct.name,
        email: appwriteAcct.email,
        phone: appwriteAcct.phone,
        verified: appwriteAcct.emailVerification,
        premium: false,
      };
      
      setUser(loggedUser);
      return loggedUser;
    } catch (err: any) {
      const errMsg = err.message || 'Authentication failed. Please verify credentials.';
      setError(errMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone: string,
    gender: 'Male' | 'Female'
  ): Promise<AuthUser> => {
    setIsLoading(true);
    setError(null);

    if (!isActive) {
      // Mock Registration
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser: AuthUser = {
            id: 'mock-user-' + Math.random().toString(36).substr(2, 9),
            name: name,
            email: email,
            phone: phone,
            gender: gender,
            verified: false,
            premium: false,
          };
          localStorage.setItem('mali_auth_user', JSON.stringify(mockUser));
          setUser(mockUser);
          setIsLoading(false);
          resolve(mockUser);
        }, 1000);
      });
    }

    try {
      const uniqueId = ID.unique();
      // Appwrite register account
      await account.create(uniqueId, email, password, name);
      
      // Auto-login after registration completed successfully
      await account.createEmailPasswordSession(email, password);
      
      // Attempt to link phone number to session if provided
      if (phone) {
        try {
          // Appwrite standard updating of phone requires SMS confirmation but we set outline
          // Note: updatePhone is supported in newest SDK version
          await account.updatePhone(phone, password);
        } catch (phoneErr) {
          console.warn('Could not set phone during signup:', phoneErr);
        }
      }

      const appwriteAcct = await account.get();
      setAppwriteUser(appwriteAcct);

      const registeredUser: AuthUser = {
        id: appwriteAcct.$id,
        name: appwriteAcct.name,
        email: appwriteAcct.email,
        phone: appwriteAcct.phone,
        gender: gender,
        verified: appwriteAcct.emailVerification,
        premium: false,
      };

      setUser(registeredUser);
      return registeredUser;
    } catch (err: any) {
      const errMsg = err.message || 'Registration failed. Please check credentials or network.';
      setError(errMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    if (!isActive) {
      localStorage.removeItem('mali_auth_user');
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      await account.deleteSession('current');
    } catch (err) {
      console.error('Appwrite: Logout session close error:', err);
    } finally {
      setUser(null);
      setAppwriteUser(null);
      setIsLoading(false);
    }
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    if (!isActive) {
      console.log('Mock password recovery sent to email:', email);
      return;
    }

    try {
      const currentUrl = window.location.origin;
      await account.createRecovery(email, `${currentUrl}/reset-password`);
    } catch (err: any) {
      setError(err.message || 'Could not send recovery link.');
      throw err;
    }
  };

  const sendEmailVerification = async (): Promise<void> => {
    if (!isActive) {
      console.log('Mock email verification dispatched.');
      return;
    }

    try {
      const currentUrl = window.location.origin;
      await account.createVerification(`${currentUrl}/verify-email`);
    } catch (err: any) {
      setError(err.message || 'Could not send email verification link.');
      throw err;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        appwriteUser,
        isLoading,
        error,
        isAppwriteActive: isActive,
        login,
        register,
        logout,
        sendPasswordReset,
        sendEmailVerification,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
