import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../services/firebase';
import { useAuth } from '../../services/AuthContext';

export function uploadPostImage(postId, image) {
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

export function uploadProfileImage(image, filename) {
  const { currentUser } = useAuth();
  uploadBytes(ref(storage, currentUser.uid), image, filename);
}
