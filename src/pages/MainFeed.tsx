import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import { getAllPostData } from "@/hooks/getPostData";
import { cn } from "@/lib/utils";

interface PostValue {
  photoURL?: File[] | undefined;
  title: string;
  content: string;
  postId: number;
  uid: string;
  nickname: string;
  createdAt: Date;
}

const MainFeed = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPostData,
  });

  // console.log("postData => ", data);

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
      <div className="flex flex-wrap justify-between h-screen gap-2 px-3 py-3">
        {data && data.length > 0 ? (
          data.map((posts: PostValue) => (
            <div
              key={posts.title}
              className="flex flex-col gap-4 w-[230px] h-[300px] cursor-pointer bg-white rounded-xl border shadow-md"
            >
              {posts.photoURL ? (
                <img
                  src={`${posts.photoURL}`}
                  alt="img"
                  className="w-full h-[150px] object-cover rounded-t-xl"
                />
              ) : (
                ""
              )}
              <div
                className={cn(
                  "w-full h-[100px] p-1 bg-slate-300",
                  !posts.photoURL && "w-full h-[400px] p-1 rounded-t-xl"
                )}
              >
                <p
                  className=" text-[#74512D]
                 font-bold"
                >
                  {" "}
                  {posts.title}
                </p>
                <span
                  className={cn(
                    "text-[14px] text-[#A79277] text-ellipsis line-clamp-3"
                  )}
                >
                  {posts.content}
                </span>
              </div>
              <div
                className={cn(
                  "flex items-center justify-between gap-2 p-1 w-full h-[60px] border",
                  posts.photoURL && "h-[50px]"
                )}
              >
                <span className="text-[#74512D] text-[14px] font-IBMSemibold">
                  {posts.nickname}
                </span>
                <span className="text-[12px]">좋아요 👍</span>
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
