import { useState, useEffect } from 'react';
import { PostType } from '../global/types';
import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

/**
 * It returns an array of posts from the database
 * @returns An array of posts property.
 */
const usePosts = () => {
  const [posts, setPosts] = useState<PostType | any>([]);

  const getPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(10));
    const postSnap = await getDocs(q);
    postSnap.forEach((doc) => {
      setPosts((prevPosts: any) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return { posts };
};

export default usePosts;
