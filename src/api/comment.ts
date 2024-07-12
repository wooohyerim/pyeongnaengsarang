import { auth, db } from "@/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
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
export const updateComment = async (
  modifyComment: string,
  postId: string,
  comment_id: string
): Promise<void> => {
  const commentRef = doc(db, "posts", postId || "", "comments", comment_id);

  const updatedData = {
    comment: modifyComment,
    updatedAt: Timestamp.now(),
  };

  await updateDoc(commentRef, updatedData);
};

// 좋아요 추가
export const addLike = async (
  postId: string,
  userId: string,
  comment_id: string
) => {
  const commentRef = doc(db, "posts", postId || "", "comments", comment_id);
  await updateDoc(commentRef, {
    likes: arrayUnion(userId),
  });
};

// 좋아요 삭제
export const removeLike = async (
  postId: string,
  userId: string,
  comment_id: string
) => {
  const commentRef = doc(db, "posts", postId || "", "comments", comment_id);
  await updateDoc(commentRef, {
    likes: arrayRemove(userId),
  });
};

// 좋아요 정보 가져오기
export const getLikesInfo = async (
  postId: string,
  userId: string,
  comment_id: string
) => {
  const commentRef = doc(db, "posts", postId || "", "comments", comment_id);
  const commentSnap = await getDoc(commentRef);

  if (commentSnap.exists()) {
    const likes = commentSnap.data().likes;
    const liked = likes?.includes(userId);
    const likeCount = likes?.length;

    return { liked, likeCount };
  }

  return { liked: false, likeCount: 0 };
};
