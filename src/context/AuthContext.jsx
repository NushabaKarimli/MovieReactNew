import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase istifadəçinin giriş vəziyyətini izləyir
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Yoxlanış bitdi
    });

    return () => unsubscribe();
  }, []);

  
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Çıxış zamanı xəta:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};