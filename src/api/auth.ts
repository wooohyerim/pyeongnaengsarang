import { auth, db, storage } from "@/firebase/firebase";
import {
  signInWithEmailAndPassword,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, collection, doc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AuthValues, SignUpValues } from "@/types";

// 회원가입
export const signUpSubmit = async (data: SignUpValues): Promise<User> => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = credential.user;

    // 프로필 이미지 업로드
    const profileImg = data.image[0];
    const fileRef = ref(storage, `${user.uid}/${profileImg.name}`);
    await uploadBytes(fileRef, profileImg);
    const downloadURL = await getDownloadURL(fileRef);

    // 사용자 프로필 업데이트
    await updateProfile(user, {
      displayName: data.nickname,
      photoURL: downloadURL,
    });

    // 사용자 데이터 Firestore에 저장
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      profileImg: downloadURL,
      email: user.email,
      password: data.password,
      name: data.name,
      nickname: data.nickname,
      bio: data.bio,
      createAt: Timestamp.fromDate(new Date()),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// 로그인
export const signInWithEmail = async ({
  email,
  password,
}: AuthValues): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};
