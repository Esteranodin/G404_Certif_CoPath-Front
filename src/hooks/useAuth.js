import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/lib/services/authService';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth doit être utilisé à l'intérieur d'un AuthProvider`);
  }
  return context;
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      return await AuthService.login(email, password);
    }
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (userData) => {
      return await AuthService.register(userData);
    }
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => {
      return AuthService.logout();
    }
  });
}

export function useCurrentUser() {
  return useMutation({
    mutationFn: async () => {
      return await AuthService.getCurrentUser();
    }
  });
}