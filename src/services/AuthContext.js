import { doc, getDoc } from 'firebase/firestore/lite';
import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUserProfile, setCurrentUserProfile] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signOut() {
    return auth.signOut().then(() => {
      localStorage.removeItem('profile')
    })
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user !== null) {
        const docSnap = await getDoc(doc(db, 'profile', user.uid));
        setCurrentUserProfile(docSnap.data());
      }
    });
    return unsubscribe;
  }, [currentUser]);

  const value = {
    currentUserProfile,
    currentUser,
    login,
    signup,
    logout: signOut,
    forgotPassword,
    updateEmail,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}