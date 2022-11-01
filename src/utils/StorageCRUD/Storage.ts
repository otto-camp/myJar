import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../services/firebase';
import { useAuth } from '../../services/AuthContext';

export function uploadPostImage(postId: string, image: Blob) {
  const { currentUser } = useAuth();
  uploadBytes(ref(storage, currentUser.uid + '/' + postId), image).then(() => {
    const urlRef = ref(storage, 'gs://myjar-8ff23.appspot.com/' + currentUser.uid + '/' + postId);
    getDownloadURL(urlRef).then(async (res) => {
      await updateDoc(doc(db, 'posts', postId), {
        postThumbnail: res
      });
    });
  });
}

export function uploadProfilePicture(picture: Blob) {
  const { currentUser } = useAuth();
  uploadBytes(ref(storage, currentUser.uid + '/profile-picture'), picture).then(() => {
    const urlRef = ref(
      storage,
      'gs://myjar-8ff23.appspot.com/' + currentUser.uid + '/profile-picture'
    );
    getDownloadURL(urlRef).then(async (res) => {
      await updateDoc(doc(db, 'profile', currentUser.uid), {
        photoURL: res
      });
    });
  });
}
