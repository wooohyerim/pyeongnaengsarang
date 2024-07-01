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
  const usersSnapshot = await getDocs(collection(db, "users"));

  const allPosts: Post[] = [];

  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id; // 유저의 ID

    // 각 유저의 포스트 컬렉션을 가져오기
    const postsCollection = await getDocs(
      collection(db, "users", userId, "posts")
    );

    postsCollection.forEach((postDoc) => {
      const postIdNumber = parseInt(postDoc.id, 10);
      allPosts.push({
        postId: postIdNumber,
        uid: postDoc.data().uid,
        nickname: postDoc.data().nickname,
        photoURL: postDoc.data().photoURL,
        title: postDoc.data().title,
        content: postDoc.data().content,
        createdAt: postDoc.data().createdAt,
      });
    });
  }
  return allPosts;
};
