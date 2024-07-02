import { auth, db, storage } from "@/firebase/firebase";
import {
  setDoc,
  doc,
  Timestamp,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

    // post 데이터 Firestore에 저장
    const postRef = await addDoc(collection(db, "posts"), {
      uid: userId,
      nickname: user?.displayName,
      photoURL: imageUrl,
      title: data.title,
      content: data.content,
      createdAt: Timestamp.fromDate(new Date()),
    });
    await updateDoc(postRef, { id: postRef.id }); // post id
    return postRef.id;
  } catch (error) {
    console.log(error);
  }
};
