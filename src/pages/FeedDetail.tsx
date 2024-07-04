import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { auth, db } from "@/firebase/firebase";
import { getUserPost, getDeletePost } from "@/hooks/getPostData";
import Loading from "@/components/Loading";
import Button from "@/components/common/Button";
import MainLayout from "@/components/layout/MainLayout";
import Error from "@/components/Error";
import { deleteDoc, doc, collection } from "firebase/firestore";

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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  // const queryClient = useQueryClient();

  // const mutation: UseMutationResult<void, Error, string> = useMutation(
  //   getDeletePost,
  //   {
  //     onSuccess: () => {
  //       // Invalidate or refetch queries to update the UI after deletion
  //       queryClient.invalidateQueries(["allPosts"]);
  //     },
  //     onError: (error: Error) => {
  //       console.error("Failed to delete the post:", error);
  //       alert("Failed to delete the post. Please try again.");
  //     },
  //   }
  // );

  // const handleDelete = (postId: string): void => {
  //   mutation.mutate(postId);
  // };

  const handleClickDelete = async (postId: string) => {
    try {
      const confirm = window.confirm("게시글을 삭제하시겠습니까?");

      if (confirm) {
        await getDeletePost(postId);
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("current post => ", currentPost);

  return (
    <MainLayout>
      <section className="z-20 flex flex-col w-full min-h-[710px] gap-4 p-4">
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
              <Button
                title="삭제하기"
                onClick={() => handleClickDelete(postId || "")}
                type="button"
              />
              <Button title="수정하기" />
            </div>
          )}
        </form>
      </section>
    </MainLayout>
  );
};

export default FeedDetail;
