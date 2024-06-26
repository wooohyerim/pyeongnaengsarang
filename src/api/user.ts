import { UpdateUserValue } from "./../types/index";
import { auth, db } from "@/firebase/firebase";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase";

// 유저 프로필 업데이트
export const updateUser = async (data: UpdateUserValue) => {
  const user = auth.currentUser;

  const userRef = doc(db, "users", `${user?.uid}`);
  const { nickname, bio, image } = data;

  // 프로필 이미지 업데이트 안하는 경우에는 기존 프로필 이미지
  let imageUrl = user?.photoURL;

  if (image && image.length > 0) {
    const imageFile = image[0];
    const storageRef = ref(storage, `${user?.uid}/${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    // 업데이트 된 이미지를 참조 .ref
    imageUrl = await getDownloadURL(snapshot.ref);
  }

  const updatedData = {
    nickname: nickname,
    bio: bio,
    profileImg: imageUrl,
    updatedAt: Timestamp.now(),
  };

  await updateDoc(userRef, updatedData);
};
