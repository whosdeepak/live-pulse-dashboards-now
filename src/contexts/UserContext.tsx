
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Mock users for demonstration - these will be the pre-existing admin accounts
const mockAdmins: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/placeholder.svg'
  }
];

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load registered users from localStorage
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    }

    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    const allUsers = [...mockAdmins, ...registeredUsers];
    const existingUser = allUsers.find(u => u.email === email);
    
    if (existingUser) {
      return false; // User already exists
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
      avatar: '/placeholder.svg'
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    return true;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Combine admin users and registered users
    const allUsers = [...mockAdmins, ...registeredUsers];
    const foundUser = allUsers.find(u => u.email === email);
    
    if (foundUser) {
      // For admins, check specific password, for regular users, any password works for demo
      if (foundUser.role === 'admin' && password !== 'admin') {
        return false;
      }
      
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <UserContext.Provider value={{ user, login, register, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
