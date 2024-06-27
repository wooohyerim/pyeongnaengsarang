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
    // staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="w-full h-screen">
          <span className="text-[#543310] text-[18px] text-center">
            Loading...
          </span>
        </div>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <div className="w-full h-screen">
          <span className="text-[#543310] text-[18px] text-center">
            Error: {error.message}
          </span>
        </div>
      </MainLayout>
    );
  }

  // console.log("유저조회페이지 => ", data);

  return (
    <MainLayout>
      <div className="flex flex-wrap justify-between h-screen gap-4 p-3">
        {data && data.length > 0 ? (
          data.map((user) => (
            <div
              key={user.uid}
              className="flex flex-col gap-4 w-[210px] h-[350px] cursor-pointer bg-white rounded-xl shadow-md"
            >
              <img
                src={user.profileImg}
                alt="img"
                className="w-[210px] min-h-[220px] object-cover rounded-xl"
              />
              <div className="flex flex-col gap-2 p-1 w-full h-[110px] overflow-auto">
                <span className="text-[#74512D] font-IBMSemibold">
                  {user.nickname}
                </span>
                <p
                  className=" text-[14px] text-[#A79277]
                line-clamp-3 text-ellipsis"
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
