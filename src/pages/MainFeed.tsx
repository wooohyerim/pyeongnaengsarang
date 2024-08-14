import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import MainLayout from "@/components/layout/MainLayout";
import { getAllInfiniteData } from "@/utils/getPostData";
import { cn } from "@/lib/utils";
import { getAllUserData } from "@/utils/getUserData";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import LikeFeed from "@/components/LikeFeed";

const MainFeed = () => {
  const navigate = useNavigate();

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUserData,
  });

  const {
    data,
    fetchNextPage,
    isLoading,
    error,
    isError,
    hasNextPage,
    // isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinityData"],
    queryFn: getAllInfiniteData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <MainLayout>
      <div className="flex flex-col w-full min-h-[730px] gap-8 px-3 py-4 ">
        {data ? (
          data?.pages.map((page) =>
            page.data.map((posts) => {
              // console.log(posts);
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
                      <p className=" text-[#74512D] font-bold">
                        {" "}
                        {posts.title}
                      </p>
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
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex items-center justify-between gap-2 p-2 w-full h-[50px] border",
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
                          loading="lazy"
                        />
                      )}
                      <span className="text-[#74512D] text-[14px] font-IBMSemibold">
                        {postUser?.nickname}
                      </span>
                    </div>
                    <LikeFeed postId={posts.postId} />
                  </div>
                </div>
              );
            })
          )
        ) : (
          <div>
            <p>게시글이 없습니다..</p>
          </div>
        )}
      </div>
      <div ref={ref}>{isFetchingNextPage ? "loading..." : ""}</div>
    </MainLayout>
  );
};

export default MainFeed;
