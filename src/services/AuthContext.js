import { doc, getDoc } from 'firebase/firestore/lite';
import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase.js';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUserProfile, setCurrentUserProfile] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut().then(() => {
      localStorage.removeItem('profile')
    })
  }

  function forgotPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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