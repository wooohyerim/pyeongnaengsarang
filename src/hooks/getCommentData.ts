import { db } from "@/firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { CommentValue } from "@/types";

// comments 문서에서 id에 있는 댓글 가져오기
export const getPostComment = async (postId: string) => {
  try {
    // Firestore의 특정 게시물(postId)의 댓글 컬렉션 참조
    const commentsRef = collection(db, "posts", postId, "comments");
    const commentsSnapshot = await getDocs(commentsRef);

    // 댓글 데이터 배열 생성
    const comments: CommentValue[] = [];
    commentsSnapshot.forEach((doc) => {
      // comments.push({ id: doc.id, ...doc.data() });
      comments.push({
        comment: doc.data().comment,
        comment_id: doc.data().comment_id,
        createAt: doc.data().createdAt,
        uid: doc.data().uid,
        nickname: doc.data().nickname,
        photoURL: doc.data().photoURL,
      });
    });
    comments.sort((a: any, b: any) => b.createdAt - a.createdAt);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
