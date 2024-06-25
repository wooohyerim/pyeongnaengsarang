import { useQuery } from "@tanstack/react-query";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import MainLayout from "@/components/layout/MainLayout";

const UserList = () => {
  // users 문서에 저장된 모든 유저 가져오기
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc: any) => ({
      ...doc.data(), // 배열로 저장
    }));
    return users;
  };

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getData,
  });

  console.log("유저조회페이지 => ", data);

  return (
    <MainLayout>
      <div></div>
    </MainLayout>
  );
};

export default UserList;
