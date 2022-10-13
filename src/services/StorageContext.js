import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { db, storage } from './firebase';

const StorageContext = createContext();

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {
  const { currentUser } = useAuth();

  function uploadPostImage(postId, image) {
    uploadBytes(ref(storage, currentUser.uid + '/' + postId), image).then(() => {
      const urlRef = ref(storage, 'gs://myjar-8ff23.appspot.com/' + currentUser.uid + '/' + postId);
      getDownloadURL(urlRef).then(async (res) => {
        await updateDoc(doc(db, 'posts', postId), {
          postThumbnail: res
        })
      })
    })
  }

  function uploadProfileImage(image, filename) {
    uploadBytes(ref(storage, currentUser.uid), image, filename);
  }

  const value = {
    uploadPostImage,
    uploadProfileImage,
  };

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}
