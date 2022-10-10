import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { useContext } from 'react';
import { createContext } from 'react';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import React from 'react';
import { useStorage } from './StorageContext';

const PostContext = createContext();

export function usePost() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const { currentUser, currentUserProfile } = useAuth();
  const { uploadPostImage } = useStorage();
  const postRef = collection(db, 'posts');

  function createPost(postText, postTitle, postSubTitle, postThumnail, postThumnailName) {
    addDoc(postRef, {
      postTitle: postTitle,
      postSubTitle: postSubTitle,
      postText: postText,
      postThumnail: '',
      createrId: currentUser.uid,
      createrName: currentUserProfile.fname + " " + currentUserProfile.lname,
      createrPhotoURL: currentUserProfile.photoURL,
      timestamp: new Date(Timestamp.now().seconds * 1000),
      likes: 0,
    }).then(async (d) => {
      await uploadPostImage(d.id, postThumnail, postThumnailName);
      await updateDoc(doc(db, 'profile', currentUser.uid), {
        createdPosts: arrayUnion(d.id)
      })
      

    })
  }

  function deletePost(id) {
    const postDoc = doc(postRef, id);
    deleteDoc(postDoc);
  }

  function updatePost(id, updatedText) {
    const postDoc = doc(postRef, id);
    updateDoc(postDoc, { postText: updatedText, timestamp: new Date(Timestamp.now().seconds * 1000) });
  }

  const value = {
    createPost,
    deletePost,
    updatePost
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
