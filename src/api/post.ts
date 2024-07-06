import { auth, db, storage } from "@/firebase/firebase";
import {
  getDoc,
  doc,
  Timestamp,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

interface PostValue {
  image?: File[];
  title: string;
  content: string;
  postId?: string;
  uid?: string;
  nickname?: string;
  createdAt?: Date;
}

interface UpdatePostValue {
  image?: File[];
  title?: string;
  content?: string;
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

// image delete
export async function deleteFile(downloadURL: string) {
  const imageRef = ref(storage, downloadURL);
  try {
    await deleteObject(imageRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

// delete post
export const deletePost = async (
  postId: string,
  downloadURL: string
): Promise<void> => {
  const postRef = doc(db, "posts", postId);
  deleteFile(downloadURL);

  await deleteDoc(postRef);
};

//update post
export const updatePost = async (
  data: UpdatePostValue,
  postId: string
  // downloadURL: string
): Promise<void> => {
  const user = auth.currentUser;
  const postRef = doc(db, "posts", `${postId}`);
  const { title, content, image } = data;

  const currentDoc = await getDoc(postRef);
  const currentData = currentDoc.data();
  console.log("sdfsdf", currentData);
  let imageUrl = currentData?.photoURL;

  if (image && image.length > 0) {
    const imageFile = image[0];
    const storageRef = ref(storage, `${user?.uid}/post/${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    // 업데이트 된 이미지를 참조 .ref
    imageUrl = await getDownloadURL(snapshot.ref);
  }

  const updatedData = {
    title: title,
    content: content,
    photoURL: imageUrl,
    updatedAt: Timestamp.now(),
  };

  await updateDoc(postRef, updatedData);
  // if (downloadURL && downloadURL !== imageUrl) {
  //   await deleteFile(downloadURL);
  // }
};
