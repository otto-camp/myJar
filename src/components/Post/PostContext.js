import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { useContext } from 'react';
import { createContext } from 'react';
import { useAuth } from '../../services/AuthContext';
import { db } from '../../services/firebase';
import React from 'react';

const PostContext = createContext();

export function usePost() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const { currentUser } = useAuth();
  const postRef = collection(db, 'posts');

  function createPost(postText) {
    addDoc(postRef, {
      postText: postText,
      id: currentUser.uid,
      timestamp: new Date(Timestamp.now().seconds * 1000),
      comments: [],
      likes: 0,
    });
  }

  function deletePost(id) {
    const postDoc = doc(postRef, id);
    deleteDoc(postDoc);
  }

  function updatePost(id, updatedText) {
    const postDoc = doc(postRef, id);
    updateDoc(postDoc, { postText: updatedText });
  }

  const value = {
    createPost,
    deletePost,
    updatePost
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
