import { auth, db } from "@/firebase/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

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

// posts 문서에서 id에 따른 유저 문서 가져오기
export const getUserPost = async (id: string) => {
  const postsDocRef = doc(db, "posts", id);
  const postDoc = await getDoc(postsDocRef);

  if (postDoc.exists()) {
    const userData = postDoc.data();
    return userData;
  } else {
    console.log("User does not exist for uid:", id);
  }
};
