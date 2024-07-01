import { auth, db, storage } from "@/firebase/firebase";
import {
  setDoc,
  doc,
  Timestamp,
  collection,
  addDoc,
  runTransaction,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
runTransaction;

interface PostValue {
  image?: File[] | undefined;
  title: string;
  content: string;
  postId?: string;
  uid?: string;
  nickname?: string;
  createdAt?: Date;
}

// post 생성
export const createPost = async (data: PostValue) => {
  const user = auth.currentUser;
  const userId = user?.uid;
  try {
    // 게시글 이미지 업로드
    let imageUrl = "";
    if (data.image && data.image.length > 0) {
      const postImg = data.image[0];
      const fileRef = ref(storage, `${user?.uid}/post/${postImg.name}`);
      await uploadBytes(fileRef, postImg);
      imageUrl = await getDownloadURL(fileRef);
    }

    // postId
    const postRef = collection(db, "users", userId || "", "posts");
    const postId = await runTransaction(db, async (transaction) => {
      // Get the current postId from a separate document (acting as a counter)
      const postCounterDocRef = doc(db, "postCounters", user?.uid || "");
      const postCounterDoc = await transaction.get(postCounterDocRef);

      let currentPostId = 1;

      if (postCounterDoc.exists()) {
        // If the counter document exists, get the current postId and increment
        currentPostId = postCounterDoc.data().currentPostId + 1;
      }

      // Set the incremented postId back to the counter document
      transaction.set(postCounterDocRef, { currentPostId });

      return currentPostId;
    });

    // post 데이터 Firestore에 저장
    await setDoc(doc(postRef), {
      postId,
      uid: userId,
      nickname: user?.displayName,
      photoURL: imageUrl,
      title: data.title,
      content: data.content,
      createAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.log(error);
  }
};
