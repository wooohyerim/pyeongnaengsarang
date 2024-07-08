import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { auth } from "@/firebase/firebase";
import { getUserPost, getAllData } from "@/hooks/getPostData";
import Loading from "@/components/Loading";
import Button from "@/components/common/Button";
import MainLayout from "@/components/layout/MainLayout";
import Error from "@/components/Error";
import { cn } from "@/lib/utils";
import { deletePost, updatePost } from "@/api/post";
import FeedImg from "@/components/FeedImg";
import Comment from "@/components/Comment";
// import { CiImageOn } from "react-icons/ci";

interface PostValue {
  image?: File[];
  title?: string;
  content?: string;
}

const FeedDetail = () => {
  const user = auth.currentUser;
  // console.log("feed 현재 유저=> ", user);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<PostValue>();

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

  // 모든 유저 가져오기
  const { data: allPost } = useQuery({
    queryKey: ["allUser", user?.uid],
    queryFn: getAllData,
  });

  const otherPost = allPost?.find((post) => post.postId === postId);

  // 현재 포스트
  const data = postId === currentPost?.postId ? currentPost : otherPost;
  // console.log(data);

  if (postId === data?.postId) {
    setValue("title", data?.title);
    setValue("content", data?.content);
    setValue("image", data?.photoURL);
  } else {
    setValue("title", otherPost?.title);
    setValue("content", otherPost?.content);
    setValue("image", otherPost?.photoURL);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const handleClickDelete = async (postId: string) => {
    try {
      const confirm = window.confirm("게시글을 삭제하시겠습니까?");
      if (confirm) {
        await deletePost(postId, currentPost?.photoURL);
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUpdate = async (data: PostValue) => {
    try {
      await updatePost(data, postId || "");
      alert("수정이 완료되었습니다.");
      window.location.replace("/main");
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

        <form
          onSubmit={handleSubmit(handleClickUpdate)}
          className="flex flex-col gap-6"
        >
          {data?.photoURL !== "" ? (
            <div className="flex flex-col w-full h-[270px] gap-2">
              <label htmlFor="postImg" className="w-full">
                <img
                  className={cn(
                    "object-cover w-full h-[230px]",
                    user?.uid !== data?.uid && "h-[250px]"
                  )}
                  src={
                    postId !== data?.postId
                      ? otherPost?.photoURL
                      : data?.photoURL
                  }
                  alt="img"
                />
              </label>
              <input
                type="file"
                {...register("image")}
                id="postImg"
                className={cn(
                  "w-full text-[12px] text-[#636363]",
                  user?.uid !== data?.uid && "hidden"
                )}
              />
            </div>
          ) : user?.uid === data?.uid ? (
            <div className="w-full">
              <label
                htmlFor="postImg"
                className="flex flex-col gap-4  items-center justify-center bg-[#eee] cursor-pointer rounded-xl"
              >
                {/* <CiImageOn size={50} style={{ color: "gray" }} />
                <span className="text-[14px] text-[#cecece]">
                  이미지 업로드
                </span>{" "} */}
              </label>
              <input
                type="file"
                {...register("image")}
                id="postImg"
                className={cn("w-full text-[14px] text-[#636363]")}
              />
            </div>
          ) : null}
          {/* <FeedImg
            data={data}
            postId={postId}
            otherPost={otherPost}
            user={user}
          /> */}
          <div className="flex flex-col">
            <input
              type="text"
              {...register("title")}
              className={cn(
                "w-full  text-[28px] text-[#543310] font-bold outline-none",
                user?.uid !== data?.uid && "bg-white"
              )}
              disabled={user?.uid !== data?.uid}
            />
            <span className="text-[12px] text-[#A79277]">
              {currentPost?.nickname}
            </span>
          </div>
          <div className="w-full h-[200px] bg-slate-50 text-[15px] text-[#74512D]">
            <textarea
              {...register("content")}
              className={cn(
                "w-full h-full outline-none text-pretty resize-none ",
                user?.uid !== data?.uid && " bg-white"
              )}
              disabled={user?.uid !== data?.uid}
            ></textarea>
          </div>

          <Comment />

          {currentPost?.uid === user?.uid && (
            <div className="flex gap-6 ">
              <Button
                title="삭제하기"
                onClick={() => handleClickDelete(postId || "")}
                type="button"
              />
              <Button title="수정하기" type="submit" />
            </div>
          )}
        </form>
      </section>
    </MainLayout>
  );
};

export default FeedDetail;
