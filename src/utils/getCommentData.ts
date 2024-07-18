import { db } from "@/firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { CommentValue } from "@/types";

// 유저 정보를 가져오는 함수
const getUserDataById = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No such user document!");
    return null;
  }
};

// comments 문서에서 id에 있는 댓글 가져오기
export const getPostComment = async (postId: string) => {
  try {
    // Firestore의 특정 게시물(postId)의 댓글 컬렉션 참조
    const commentsRef = collection(db, "posts", postId, "comments");
    const commentsSnapshot = await getDocs(commentsRef);

    // 댓글 데이터 배열 생성
    const comments: CommentValue[] = [];

    for (const doc of commentsSnapshot.docs) {
      const commentData = doc.data();
      const userData = await getUserDataById(commentData.uid);
      // console.log(userData);

      if (userData) {
        comments.push({
          comment: commentData.comment,
          comment_id: commentData.comment_id,
          createdAt: commentData.createdAt,
          uid: commentData.uid,
          nickname: userData.nickname,
          photoURL: userData.profileImg,
        });
      }
    }

    comments.sort((a: any, b: any) => b.createdAt - a.createdAt);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
