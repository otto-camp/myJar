import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { UserType } from '../../global/types';
import { db } from '../../services/firebase';

<<<<<<< HEAD
export function follow(targetUser: UserType, user: UserType) {
  if (!user.follows?.includes(targetUser.id!)) {
    const follow = async () =>
      await updateDoc(doc(db, 'profile', user.id!), {
        follows: arrayUnion(targetUser.id)
      }).then(async () => {
        await updateDoc(doc(db, 'profile', targetUser.id!), {
=======
export function follow(targetUser, user) {
  if (!user.follows.includes(targetUser.id)) {
    const follow = async () =>
      await updateDoc(doc(db, 'profile', user.id), {
        follows: arrayUnion(targetUser.id)
      }).then(async () => {
        await updateDoc(doc(db, 'profile', targetUser.id), {
>>>>>>> 9f18ee1e9dd1dc929592b927d8b91c7efbe5f00d
          followers: arrayUnion(user.id)
        });
      });
    follow();
  }
}

<<<<<<< HEAD
export function unfollow(targetUser: UserType, user: UserType) {
  if (user.follows?.includes(targetUser.id!)) {
    const unfollow = async () =>
      await updateDoc(doc(db, 'profile', user.id!), {
        follows: arrayRemove(targetUser.id)
      }).then(async () => {
        await updateDoc(doc(db, 'profile', targetUser.id!), {
=======
export function unfollow(targetUser, user) {
  if (user.follows.includes(targetUser.id)) {
    const unfollow = async () =>
      await updateDoc(doc(db, 'profile', user.id), {
        follows: arrayRemove(targetUser.id)
      }).then(async () => {
        await updateDoc(doc(db, 'profile', targetUser.id), {
>>>>>>> 9f18ee1e9dd1dc929592b927d8b91c7efbe5f00d
          followers: arrayRemove(user.id)
        });
      });
    unfollow();
  }
}
