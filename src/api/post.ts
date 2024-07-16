import { auth, db, storage } from "@/firebase/firebase";
import { PostValue } from "@/types";
import {
  getDoc,
  doc,
  Timestamp,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

interface UpdatePostValue {
  image?: File[];
  title?: string;
  content?: string;
}

// // 이미지 webp로 변환
// const convertToWebP = (file: Blob): Promise<Blob> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.src = URL.createObjectURL(file);
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx?.drawImage(img, 0, 0);

//       canvas.toBlob((blob) => {
//         if (blob) {
//           resolve(blob);
//         } else {
//           reject(new Error("Image conversion failed"));
//         }
//       }, "image/webp");
//     };
//     img.onerror = reject;
//   });
// };

// post 생성
export const createPost = async (data: PostValue) => {
  const user = auth.currentUser;
  const userId = user?.uid;
  try {
    // 게시글 이미지 업로드
    let imageUrl = "";
    if (data.image && data.image.length > 0) {
      const postImg = data.image[0];
      // const webpImg = await convertToWebP(postImg);

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
): Promise<void> => {
  const user = auth.currentUser;
  const postRef = doc(db, "posts", postId);
  const { title, content, image } = data;

  console.log("upload image => ", image);

  const currentDoc = await getDoc(postRef);
  const currentData = currentDoc.data();

  let imageUrl = currentData?.photoURL;
  let updateImgUrl = "";

  if (image && Array.isArray(image) && image.length > 0) {
    const imageFile = image[0];
    // const webpImg = await convertToWebP(imageFile);
    // console.log("Image file:", imageFile);
  } else if (image && image.length > 0) {
    const imageFile = image[0];
    const storageRef = ref(storage, `${user?.uid}/post/${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);

    // 업데이트 된 이미지를 참조 -> .ref
    updateImgUrl = await getDownloadURL(snapshot.ref);

    if (updateImgUrl && imageUrl) {
      await deleteFile(imageUrl);
    }

    imageUrl = updateImgUrl;
  }

  // console.log("Uploaded image URL:", imageUrl);

  const updatedData = {
    title: title,
    content: content,
    photoURL: imageUrl,
    nickname: user?.displayName,
    updatedAt: Timestamp.now(),
  };
  await updateDoc(postRef, updatedData);
};

// 좋아요 추가
export const addLike = async (postId: string, userId: string) => {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    likes: arrayUnion(userId),
  });
};

// 좋아요 삭제
export const removeLike = async (postId: string, userId: string) => {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    likes: arrayRemove(userId),
  });
};

// 좋아요 정보 가져오기
export const getLikesInfo = async (postId: string, userId: string) => {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    const likes = postSnap.data().likes;
    const liked = likes?.includes(userId);
    const likeCount = likes?.length;

    return { liked, likeCount };
  }

  return { liked: false, likeCount: 0 };
};
