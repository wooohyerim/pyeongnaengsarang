import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

import Button from "@/components/common/Button";
import MainLayout from "@/components/layout/MainLayout";
import { auth } from "@/firebase/firebase";
import { getUserPost, getAllPostData } from "@/hooks/getPostData";

const FeedDetail = () => {
  const user = auth.currentUser;
  // console.log("feed 현재 유저=> ", user);
  const { postId } = useParams();
  const navigate = useNavigate();

  // postId에 따라 정보 가져오기
  const {
    data: currentPost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getUserPost(postId || ""),
    enabled: !!postId,
  });

  const { data: allPost } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPostData,
  });

  // console.log(allPost);

  // const otherPost = allPost?.find((post) => post?.postId == postId);

  // console.log(otherPost);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching user data:", error);

    return <p>Error loading data</p>;
  }

  // console.log("current post => ", currentPost);

  return (
    <MainLayout>
      <section className="flex flex-col w-full h-screen gap-4 p-4">
        <span>
          <MdOutlineArrowBackIosNew
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/main")}
          />
        </span>
        <form className="flex flex-col gap-8">
          {currentPost?.photoURL !== "" ? (
            <div className="w-[450px] h-[250px]">
              <img
                className="object-cover w-full h-full"
                src={currentPost?.photoURL}
                alt="img"
              />
            </div>
          ) : null}

          <div>
            <h1 className="text-[28px] text-[#543310] font-bold">
              {currentPost?.title}
            </h1>
            <span className="text-[14px] text-[#A79277] pl-1">
              {currentPost?.nickname}
            </span>
          </div>
          <div className="h-[120px] pl-1  text-[#74512D]">
            {currentPost?.content}
          </div>
          <div className="bg-slate-200 min-h-[150px]">댓글 자리</div>
          {currentPost?.uid === user?.uid && (
            <div className="flex gap-6 ">
              <Button title="삭제하기" />
              <Button title="수정하기" />
            </div>
          )}
        </form>
      </section>
    </MainLayout>
  );
};

export default FeedDetail;
