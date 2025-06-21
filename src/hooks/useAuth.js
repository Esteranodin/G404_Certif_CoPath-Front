/**
 * Hook d'authentification
 * @module useAuth
 * @description Hook pour consommer le contexte d'authentification
 * @requires AuthContext
 */

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

/**
 * @returns {Object} 
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }

  return context;
}

export default useAuth;