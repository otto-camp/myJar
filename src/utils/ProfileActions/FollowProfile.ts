import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../services/firebase';

export function follow(targetUser, user) {
  if (!user.friends.includes(targetUser.id)) {
    const follow = async () =>
      await updateDoc(doc(db, 'profile', user.id), {
        friends: arrayUnion(targetUser.id)
      });
    follow();
  }
}

export function unfollow(targetUser, user) {
  if (user.friends.includes(targetUser.id)) {
    const unfollow = async () =>
      await updateDoc(doc(db, 'profile', user.id), {
        friends: arrayRemove(targetUser.id)
      });
    unfollow();
  }
}
