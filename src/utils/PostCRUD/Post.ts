import {
  collection,
  Timestamp,
  updateDoc,
  arrayUnion,
  doc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import { useAuth } from '../../services/AuthContext';
import { db } from '../../services/firebase';
import { uploadPostImage } from '../StorageCRUD/Storage';

export function createPost(postText, postTitle, postSubTitle, postThumnail) {
  const { currentUser, currentUserProfile } = useAuth();

  addDoc(collection(db, 'posts'), {
    postTitle: postTitle,
    postSubTitle: postSubTitle,
    postText: postText,
    postThumbnail: '',
    createrId: currentUser.uid,
    createrName: currentUserProfile.fname + ' ' + currentUserProfile.lname,
    createrPhotoURL: currentUserProfile.photoURL,
    timestamp: new Date(Timestamp.now().seconds * 1000),
    likes: 0
  }).then(async (d) => {
    await uploadPostImage(d.id, postThumnail);
    await updateDoc(doc(db, 'profile', currentUser.uid), {
      createdPosts: arrayUnion(d.id)
    });
  });
}

export function deletePost(id) {
  const postDoc = doc(collection(db, 'posts'), id);
  deleteDoc(postDoc);
}

export function updatePost(id, updatedText) {
  const postDoc = doc(collection(db, 'posts'), id);
  updateDoc(postDoc, {
    postText: updatedText,
    timestamp: new Date(Timestamp.now().seconds * 1000)
  });
}
