import { Timestamp } from 'firebase/firestore';

export type PostType = {
  pid: string;
  postTitle: string;
  postSubTitle: string;
  postText: string;
  postThumbnail: string;
  timestamp: Timestamp;
  likes: number;
  createrPhotoURL: string;
  createrName: string;
  createrId: string;
  category: string;
};

export type UserType = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  about: string;
  facebook: string;
  github: string;
  instagram: string;
  twitter: string;
  website: string;
  likedPosts: string[];
  createdPosts: string[];
  follows: string[];
  followers: string[];
  photoURL: string;
};
