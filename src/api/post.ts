import { auth, db, storage } from "@/firebase/firebase";
import { setDoc, doc, Timestamp, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface PostValue {
  image?: File[] | undefined;
  title: string;
  content: string;
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

    // post 데이터 Firestore에 저장
    await setDoc(doc(postRef), {
      // postId: postRef.id,
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
