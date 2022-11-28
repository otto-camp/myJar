import { collection, Timestamp, updateDoc, arrayUnion, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.js';
import { uploadPostImage } from './Storage';
import { UserType } from '../../global/types';

export function createPost(
  postText: string,
  postTitle: string,
  postSubTitle: string,
  postThumbnail: Blob,
  postCategory: string,
  currentUser: any,
  currentUserProfile: UserType
) {
  addDoc(collection(db, 'posts'), {
    postTitle: postTitle,
    postSubTitle: postSubTitle,
    postText: postText,
    postThumbnail: '',
    createrId: currentUser.uid,
    createrName: currentUserProfile.fname + ' ' + currentUserProfile.lname,
    createrPhotoURL: currentUserProfile.photoURL,
    timestamp: new Date(Timestamp.now().seconds * 1000),
    likes: 0,
    category: postCategory
  }).then(async (d) => {
    await uploadPostImage(d.id, postThumbnail,currentUser);
    await updateDoc(doc(db, 'profile', currentUser.uid), {
      createdPosts: arrayUnion(d.id)
    });
  });
}

export function deletePost(id: string) {
  const postDoc = doc(collection(db, 'posts'), id);
  deleteDoc(postDoc);
}

export function updatePost(id: string, updatedText: string) {
  const postDoc = doc(collection(db, 'posts'), id);
  updateDoc(postDoc, {
    postText: updatedText,
    timestamp: new Date(Timestamp.now().seconds * 1000)
  });
}
