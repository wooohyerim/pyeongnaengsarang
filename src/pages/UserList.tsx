import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import { getAllUserData } from "@/utils/getUserData";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const UserList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUserData,
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <MainLayout>
      <div className="flex flex-wrap justify-between min-h-[750px] gap-4 px-8 py-3 ">
        {data && data.length > 0 ? (
          data.map((user) => (
            <div
              key={user.uid}
              onClick={() => navigate(`/mypage/${user.uid}`)}
              className="flex flex-col gap-4 w-[190px] h-[300px] cursor-pointer bg-white rounded-xl shadow-md "
            >
              <img
                src={user.profileImg}
                alt="img"
                className="w-[190px] min-h-[200px] object-cover rounded-xl"
              />
              <div className="flex flex-col gap-2 p-1 w-full h-[110px] overflow-auto">
                <span className="text-[#74512D] font-IBMSemibold">
                  {user.nickname}
                </span>
                <textarea
                  defaultValue={user.bio}
                  className=" text-[13px] text-[#A79277]
                line-clamp-2 text-ellipsis resize-none outline-none"
                />
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
