import { getDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { UserType } from '../global/types';
import { db } from '../services/firebase';

/**
 * It returns a user object from the database
 * @param {string | undefined} id - string | undefined
 * @returns An object with a user property.
 */
const useProfile = (id: string | undefined) => {
  const [user, setUser] = useState<UserType>();

  const getUserProfile = async () => {
    if (id !== undefined) {
      const docSnap = await getDoc(doc(db, 'profile', id));
      if (docSnap.exists()) {
        const doc = docSnap.data() as UserType;
        setUser(doc);
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [id]);
  return { user };
};

export default useProfile;
