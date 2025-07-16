// DEV ONLY: Remove or replace with real auth before production!
// /lib/UserContext.tsx
import React, { createContext, useContext } from "react";
import { dummyUser } from "./mockUser";

// Context type
interface UserContextType {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Create context with dummyUser as default
const UserContext = createContext<UserContextType>(dummyUser);

// Hook for easy access
export function useUser() {
  return useContext(UserContext);
}

// Provider wraps app, provides dummyUser to all pages/components
export function UserProvider({ children }: { children: React.ReactNode }) {
  // Could later swap this out for Supabase/OAuth real user
  return (
    <UserContext.Provider value={dummyUser}>
      {children}
    </UserContext.Provider>
  );
} 