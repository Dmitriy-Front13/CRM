"use client";

import { createContext, useContext, useState } from "react";

interface TUser {
  fullName: string;
  position: string;
}

const AuthContext = createContext({
  user: null as null | TUser,
  setUser: (user: TUser) => {},
});

export const AuthProvider = ({ user: userData, children }) => {
  const [user, setUser] = useState(userData);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
