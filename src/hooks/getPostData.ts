import { auth, db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
  startAfter,
  deleteDoc,
} from "firebase/firestore";

interface Post {
  postId: string;
  uid: string;
  nickname: string;
  photoURL: File[];
  title: string;
  content: string;
  createdAt: Date;
}

interface GetPostDataResult {
  data: Post[];
  nextCursor: any; //
}

// users 문서에 저장된 모든 유저 가져오기
// export const getAllPostData = async () => {
//   const allPosts: Post[] = [];

//   // 각 유저의 포스트 컬렉션을 가져오기
//   const postsCollection = await getDocs(collection(db, "posts"));

//   postsCollection.forEach((postDoc) => {
//     allPosts.push({
//       postId: postDoc.data().id,
//       uid: postDoc.data().uid,
//       nickname: postDoc.data().nickname,
//       photoURL: postDoc.data().photoURL,
//       title: postDoc.data().title,
//       content: postDoc.data().content,
//       createdAt: postDoc.data().createdAt,
//     });
//   });
//   allPosts.sort((a: any, b: any) => b.createdAt - a.createdAt);
//   return allPosts;
// };

export const getAllPostData = async (
  page = 1,
  cursor: any = null
): Promise<GetPostDataResult> => {
  const allPosts: Post[] = [];
  const postsRef = collection(db, "posts");
  let postsQuery;

  if (cursor) {
    postsQuery = query(
      postsRef,
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(3)
    );
  } else {
    postsQuery = query(postsRef, orderBy("createdAt", "desc"), limit(3));
  }

  const postsSnapshot = await getDocs(postsQuery);

  postsSnapshot.forEach((postDoc) => {
    allPosts.push({
      postId: postDoc.id,
      uid: postDoc.data().uid,
      nickname: postDoc.data().nickname,
      photoURL: postDoc.data().photoURL,
      title: postDoc.data().title,
      content: postDoc.data().content,
      createdAt: postDoc.data().createdAt,
    });
  });

  let nextCursor = null;
  if (!postsSnapshot.empty) {
    nextCursor = postsSnapshot.docs[postsSnapshot.docs.length - 1];
  }

  return { data: allPosts, nextCursor };
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

export const getDeletePost = async (postId: string): Promise<void> => {
  const postRef = doc(db, "posts", postId);

  await deleteDoc(postRef);
};
