import { auth, db } from "@/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { CommentValue } from "@/types";

// create comment
export const createComment = async (data: CommentValue, postId: string) => {
  const user = auth.currentUser;
  // const userId = user?.uid;
  try {
    // comment 데이터 Firestore에 저장
    const commentRef = await addDoc(
      collection(db, "posts", postId || "", "comments"),
      {
        uid: user?.uid,
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

// delete comment
export const deleteComment = async (
  postId: string,
  comment_id: string
): Promise<void> => {
  const commentRef = doc(db, "posts", postId || "", "comments", comment_id);

  await deleteDoc(commentRef);
};

//update comment
export const updatePost = async (
  data: CommentValue,
  comment_id: string,
  postId: string
  // downloadURL: string
): Promise<void> => {
  const user = auth.currentUser;
  const commentRef = doc(db, "posts", postId || "", "comments", comment_id);
  const { comment } = data;

  const currentDoc = await getDoc(commentRef);
  const currentData = currentDoc.data();
  console.log("sdfsdf", currentData);

  // const updatedData = {
  //   title: title,
  //   content: content,
  //   photoURL: imageUrl,
  //   updatedAt: Timestamp.now(),
  // };

  // await updateDoc(postRef, updatedData);
};
