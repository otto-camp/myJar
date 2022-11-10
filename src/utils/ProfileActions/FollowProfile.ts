import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { UserType } from '../../global/types';
import { db } from '../../services/firebase.js';

export function follow(targetUser: UserType, user: UserType) {
  if (!user.follows?.includes(targetUser.id!)) {
    const follow = async () =>
      await updateDoc(doc(db, 'profile', user.id!), {
        follows: arrayUnion(targetUser.id)
      }).then(async () => {
        await updateDoc(doc(db, 'profile', targetUser.id!), {
          followers: arrayUnion(user.id)
        });
      });
    follow();
  }
}

export function unfollow(targetUser: UserType, user: UserType) {
  if (user.follows?.includes(targetUser.id!)) {
    const unfollow = async () =>
      await updateDoc(doc(db, 'profile', user.id!), {
        follows: arrayRemove(targetUser.id)
      }).then(async () => {
        await updateDoc(doc(db, 'profile', targetUser.id!), {
          followers: arrayRemove(user.id)
        });
      });
    unfollow();
  }
}
