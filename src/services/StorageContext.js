import { getStorage, ref } from 'firebase/storage';
import { useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const StorageContext = React.createContext();

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const storage = getStorage();

  function uploadPostImage(postId, image, filename) {
    uploadImage(ref(storage, postId), image, filename);
  }

  const value = {
    uploadPostImage
  };

  return <StorageContext.Provider value={value}>{!loading && children}</StorageContext.Provider>;
}
