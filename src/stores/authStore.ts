import create from 'zustand';
import { auth } from '../lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  user_type: string;
  phone_number: string;
  location: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (username: string, password: string) => {
    try {
      const response = await auth.login(username, password);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },

  getProfile: async () => {
    try {
      const response = await auth.getProfile();
      set({ user: response.data });
    } catch (error) {
      console.error('Failed to get profile:', error);
      throw error;
    }
  },
}));