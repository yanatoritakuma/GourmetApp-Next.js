export type Post = {
  id: string;
  avatar: string;
  image: string;
  storeName: string;
  storeTel: string;
  streetAddress: string;
  note: string;
  category: string;
  favo: number;
  favoList: string[];
  postId: string;
  timestamp: null;
};

export type MyPost = {
  id: string;
  avatar: string;
  image: string;
  storeName: string;
  storeTel: string;
  streetAddress: string;
  note: string;
  category: string;
  favo: number;
  favoList: string[];
  timestamp: null;
  username: string;
  userID: string;
};
