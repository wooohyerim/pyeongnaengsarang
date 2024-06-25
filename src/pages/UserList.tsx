import { useQuery } from "@tanstack/react-query";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import MainLayout from "@/components/layout/MainLayout";

const UserList = () => {
  // users 문서에 저장된 모든 유저 가져오기
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      ...doc.data(), // 배열로 저장
    }));
    return users;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getData,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // console.log("유저조회페이지 => ", data);

  return (
    <MainLayout>
      <div className="flex flex-wrap h-full gap-4 mt-5">
        {data && data.length > 0 ? (
          data.map((user) => (
            <div
              key={user.uid}
              className="flex flex-col gap-6 w-[230px] h-[450px] cursor-pointer hover:-translate-y-2 transition "
            >
              <img
                src={user.profileImg}
                alt="img"
                className="w-full h-[230px] object-cover rounded-xl"
              />
              <div className="flex flex-col gap-2">
                <span className="text-[#74512D] font-IBMSemibold">
                  {user.nickname}
                </span>
                <p
                  className="w-full h-[100px] text-[14px] text-[#A79277]
                line-clamp-5"
                >
                  {user.bio}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>회원을 조회할 수 없습니다...</p>
        )}
      </div>
    </MainLayout>
  );
};

export default UserList;
