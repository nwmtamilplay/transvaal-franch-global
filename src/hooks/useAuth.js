// src/hooks/useAuth.js
import { useEffect, useState, useCallback } from "react";
import { auth } from "../firebase/config";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const google = new GoogleAuthProvider();

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (u) => { setUser(u); setLoading(false); },
      (e) => { setError(e); setLoading(false); }
    );
    return unsub;
  }, []);

  const signInGoogle = useCallback(() => signInWithPopup(auth, google), []);
  const signIn = useCallback((email, password) =>
    signInWithEmailAndPassword(auth, email, password), []);
  const register = useCallback(async (email, password, displayName) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(user, { displayName });
    return user;
  }, []);
  const resetPassword = useCallback((email) => sendPasswordResetEmail(auth, email), []);
  const logout = useCallback(() => signOut(auth), []);

  return { user, loading, error, isLoggedIn: !!user, signInGoogle, signIn, register, resetPassword, logout };
}