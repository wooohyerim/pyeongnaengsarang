import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import { getAllPostData } from "@/hooks/getPostData";

const MainFeed = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPostData,
  });

  console.log("postData => ", data);

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
  return (
    <MainLayout>
      <div className="w-full h-screen">
        {data && data.length > 0 ? (
          data.map((posts: any) => (
            <div
              key={posts.uid}
              onClick={() => navigate(`/mypage/${posts.uid}`)}
              className="flex flex-col gap-4 w-[190px] h-[300px] cursor-pointer bg-white rounded-xl shadow-lg"
            >
              {posts.photoURL ? (
                <img
                  src={posts.photoURL}
                  alt="img"
                  className="w-[190px] min-h-[200px] object-cover rounded-xl"
                />
              ) : (
                ""
              )}

              <div className="flex flex-col gap-2 p-1 w-full h-[110px] overflow-auto">
                <span className="text-[#74512D] font-IBMSemibold">
                  {posts.nickname}
                </span>
                <p
                  className=" text-[13px] text-[#A79277]
                line-clamp-3 text-ellipsis"
                >
                  {posts.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>피드가 없습니다..</p>
        )}
      </div>
    </MainLayout>
  );
};

export default MainFeed;
