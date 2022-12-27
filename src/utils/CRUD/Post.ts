import {
  collection,
  Timestamp,
  updateDoc,
  arrayUnion,
  doc,
  addDoc,
  deleteDoc,
  arrayRemove
} from 'firebase/firestore/lite';
import { db } from '../../services/firebase.js';
import { uploadPostImage } from './Storage';

export function createPost(
  postText: string,
  postTitle: string,
  postSubTitle: string,
  postThumbnail: Blob,
  postCategory: string,
  currentUser: any
) {
  addDoc(collection(db, 'posts'), {
    postTitle: postTitle,
    postSubTitle: postSubTitle,
    postText: postText,
    postThumbnail: '',
    createrId: currentUser.uid,
    timestamp: new Date(Timestamp.now().seconds * 1000),
    likes: 0,
    category: postCategory
  }).then(async (d) => {
    await uploadPostImage(d.id, postThumbnail, currentUser);
    await updateDoc(doc(db, 'profile', currentUser.uid), {
      createdPosts: arrayUnion(d.id)
    });
  });
}

export function deletePost(postId: string, userId: string) {
  const postDoc = doc(collection(db, 'posts'), postId);
  deleteDoc(postDoc);
  updateDoc(doc(db, 'profile', userId), {
    createdPosts: arrayRemove(postId)
  });
}

export function updatePost(id: string, updatedTitle: string, updatedSubTitle: string, updatedCategory: string) {
  const postDoc = doc(collection(db, 'posts'), id);
  updateDoc(postDoc, {
    postTitle: updatedTitle,
    postSubTitle: updatedSubTitle,
    category: updatedCategory,
    timestamp: new Date(Timestamp.now().seconds * 1000)
  });
}
