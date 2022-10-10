import { ref, uploadBytes } from 'firebase/storage';
import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { storage } from './firebase';

const StorageContext = createContext();

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {
  const { currentUser } = useAuth();

  function uploadPostImage(postId, image, filename) {
    uploadBytes(ref(storage, currentUser.uid + '/' + postId), image, filename);
  }

  function uploadProfileImage(image, filename) {
    uploadBytes(ref(storage, currentUser.uid), image, filename);
  }

  const value = {
    uploadPostImage,
    uploadProfileImage
  };

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}
