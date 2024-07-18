import { db } from "@/firebase/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// users 문서에 저장된 모든 유저 가져오기
export const getAllUserData = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => ({
    ...doc.data(), // 배열로 저장
  }));
  return users;
};

// 문서에서 한 명의 유저 가져오기
export const getUserProfile = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData;
  } else {
    console.log("User does not exist for uid:", uid);
  }
};
