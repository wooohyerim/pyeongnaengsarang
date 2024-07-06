import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import { getAllData } from "@/hooks/getPostData";
import { cn } from "@/lib/utils";
import { getAllUserData } from "@/hooks/getUserData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

interface PostValue {
  photoURL?: File[];
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
    queryFn: getAllData,
  });

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUserData,
  });

  // console.log(userData);

  // console.log("postData => ", data);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }
  return (
    <MainLayout>
      <div className="flex flex-wrap justify-between w-full min-h-[750px] gap-4 px-3 py-4">
        {data && data.length > 0 ? (
          data?.map((posts) => {
            const postUser = userData?.find((user) => user.uid === posts.uid);
            return (
              <div
                key={posts.postId}
                className="flex flex-col justify-between  w-full h-[200px] rounded-xl border shadow-md cursor-pointer"
                onClick={() => navigate(`/detail/${posts.postId}`)}
              >
                <div className="flex w-full h-[150px] ">
                  <div
                    className={cn(
                      "w-[300px] h-full p-2",
                      !posts.photoURL && "w-full h-full p-2 rounded-t-xl "
                    )}
                  >
                    <p className=" text-[#74512D] font-bold"> {posts.title}</p>
                    <span
                      className={cn(
                        "text-[14px] text-[#A79277] text-ellipsis line-clamp-5 text-pretty"
                      )}
                    >
                      {posts.content}
                    </span>
                  </div>
                  {posts.photoURL && (
                    <img
                      src={`${posts.photoURL}`}
                      alt="img"
                      className="object-cover w-[200px] h-full rounded-t-xl"
                    />
                  )}
                </div>
                <div
                  className={cn(
                    "flex items-center justify-between gap-2 p-2 w-full h-[60px] border",
                    posts.photoURL && "h-[50px]"
                  )}
                >
                  <div className="flex items-center">
                    {" "}
                    {postUser && postUser.profileImg && (
                      <img
                        src={postUser.profileImg}
                        alt="User Profile"
                        className="w-[30px] h-[30px] rounded-full mr-2"
                      />
                    )}
                    <span className="text-[#74512D] text-[14px] font-IBMSemibold">
                      {posts.nickname}
                    </span>
                  </div>
                  {/* 
                  <span className="text-[12px]">좋아요 위치</span> */}
                </div>
              </div>
            );
          })
        ) : (
          <p>피드가 없습니다..</p>
        )}
      </div>
    </MainLayout>
  );
};

export default MainFeed;
