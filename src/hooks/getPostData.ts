import { auth, db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Post {
  postId: number;
  uid: string;
  nickname: string;
  photoURL: File[];
  title: string;
  content: string;
  createdAt: Date;
}

// users 문서에 저장된 모든 유저 가져오기
export const getAllPostData = async () => {
  const allPosts: Post[] = [];

  // 각 유저의 포스트 컬렉션을 가져오기
  const postsCollection = await getDocs(collection(db, "posts"));

  postsCollection.forEach((postDoc) => {
    allPosts.push({
      postId: postDoc.data().id,
      uid: postDoc.data().uid,
      nickname: postDoc.data().nickname,
      photoURL: postDoc.data().photoURL,
      title: postDoc.data().title,
      content: postDoc.data().content,
      createdAt: postDoc.data().createdAt,
    });
  });
  allPosts.sort((a: any, b: any) => b.createdAt - a.createdAt);
  return allPosts;
};
