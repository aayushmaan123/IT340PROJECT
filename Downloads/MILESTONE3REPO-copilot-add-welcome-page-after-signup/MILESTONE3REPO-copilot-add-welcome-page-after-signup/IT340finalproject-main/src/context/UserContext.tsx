import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: () => {},
  signOut: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: { 'Authorization': 'Bearer ' + token },
      })
        .then(res => res.json())
        .then(data => {
          if (data.username) setUsername(data.username);
        });
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem('token');
    setUsername(null);
    window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ username, setUsername, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
