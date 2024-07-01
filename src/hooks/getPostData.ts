import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// users 문서에 저장된 모든 유저 가져오기
export const getAllPostData = async () => {
  const usersSnapshot = await getDocs(collection(db, "users"));

  const allPosts: any = [];
  // const querySnapshot = await getDocs(
  //   collection(db, "users", user?.uid || "", "posts")
  // );
  // const postData = querySnapshot.docs.map((doc) => ({
  //   ...doc.data(), // 배열로 저장
  // }));
  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id; // 유저의 ID

    // 각 유저의 포스트 컬렉션을 가져오기
    const postsCollection = await getDocs(
      collection(db, "users", userId, "posts")
    );

    postsCollection.forEach((postDoc) => {
      allPosts.push({
        userId, // 유저 ID 포함
        postId: postDoc.id, // 포스트 ID 포함
        ...postDoc.data(),
      });
    });
  }
  return allPosts;
};
