import { useState, useEffect } from 'react';
import { PostType } from '../global/types';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../services/firebase';

/**
 * It returns a post object from the database
 * @param {string} id - string - The id of the post to get
 * @returns An object with a post property.
 */
const usePost = (id: string) => {
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    const getPost = async () => {
      const postSnap = await getDoc(doc(db, 'posts', id));
      if (postSnap.exists()) {
        const doc = postSnap.data() as PostType;
        setPost(doc);
      }
    };

    getPost();
  }, [id]);

  return { post };
};

export default usePost;
