import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';

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
    return auth.signOut();
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
      if (user) {
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