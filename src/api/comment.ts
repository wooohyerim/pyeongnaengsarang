import { auth, db } from "@/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

interface CommentValue {
  comment: string;
  uid: string;
  nickname: string;
  photoURL: string;
  createAt: Date;
}

// comment생성
export const createComment = async (data: CommentValue, postId: string) => {
  const user = auth.currentUser;
  const userId = user?.uid;
  try {
    // comment 데이터 Firestore에 저장
    const commentRef = await addDoc(
      collection(db, "posts", postId || "", "comments"),
      {
        uid: userId,
        nickname: user?.displayName,
        photoURL: user?.photoURL,
        comment: data?.comment,
        createdAt: Timestamp.now(),
      }
    );
    await updateDoc(commentRef, { comment_id: commentRef.id }); // comment id
    return commentRef.id;
  } catch (error) {
    console.log("create comment => ", error);
  }
};
