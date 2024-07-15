import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { auth } from "@/firebase/firebase";
import { getUserPost, getAllData } from "@/hooks/getPostData";
import Loading from "@/components/Loading";
import Button from "@/components/common/Button";
import MainLayout from "@/components/layout/MainLayout";
import Error from "@/components/Error";
import { cn } from "@/lib/utils";
import { deletePost, updatePost } from "@/api/post";
import Comment from "@/components/Comment";
import LikeFeed from "@/components/LikeFeed";

interface UpdatePostValue {
  image?: File[];
  title?: string;
  content?: string;
}

const FeedDetail = () => {
  const user = auth.currentUser;
  const { postId } = useParams();
  const navigate = useNavigate();
  const methods = useForm();

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
  // console.log(otherPost);

  // 현재 포스트
  const data = postId === currentPost?.postId ? currentPost : otherPost;
  console.log(data);

  const { register, handleSubmit, setValue } = useForm<UpdatePostValue>({
    defaultValues: {
      title: data?.title,
      content: data?.content,
    },
  });

  // Timestamp 날짜 추출
  const day = currentPost?.createdAt?.toDate();
  const updateDay = currentPost?.updatedAt?.toDate();
  const year = updateDay ? updateDay?.getFullYear() : day?.getFullYear();
  const month = (
    "0" + (updateDay ? updateDay?.getMonth() + 1 : day?.getMonth() + 1)
  ).slice(-2);
  const days = (
    "0" + (updateDay ? updateDay?.getDate() : day?.getDate())
  ).slice(-2);
  const dateString = year + "-" + month + "-" + days;

  if (postId === data?.postId) {
    setValue("title", data?.title);
    setValue("content", data?.content);
    setValue("image", data?.photoURL);
  } else {
    setValue("title", otherPost?.title);
    setValue("content", otherPost?.content);
    setValue("image", otherPost?.photoURL);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue("image", [e.target.files[0]]);
    } else {
      setValue("image", undefined);
    }
  };

  const handleClickUpdate = async (data: UpdatePostValue) => {
    try {
      await updatePost(data, postId || "");
      alert("수정이 완료되었습니다.");
      // queryClient.invalidateQueries({ queryKey: ["post", postId] });
      navigate("/main");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <MainLayout>
      <section className="z-20 flex flex-col w-full min-h-[710px] gap-4 p-4">
        <span>
          <MdOutlineArrowBackIosNew
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/main")}
          />
        </span>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleClickUpdate)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2 pb-3 border border-t-0 border-x-0 border-b-gray-200">
              <input
                type="text"
                {...register("title")}
                className={cn(
                  "w-full  text-[24px] text-[#543310] font-bold outline-none border rounded-xl py-1 px-2",
                  user?.uid !== data?.uid && "bg-white border-none"
                )}
                disabled={user?.uid !== data?.uid}
              />
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2">
                  <span className="text-[12px] text-[#A79277]">
                    {currentPost?.nickname}
                  </span>
                  <span className="text-[12px] text-[#A79277]">
                    {dateString}
                  </span>
                </div>
                <LikeFeed postId={postId} />
              </div>
            </div>
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
                  onChange={handleImageChange}
                  disabled={user?.uid !== data?.uid}
                />
              </div>
            ) : user?.uid === data?.uid ? (
              <div className="w-full">
                <label
                  htmlFor="postImg"
                  className="flex flex-col gap-4  items-center justify-center bg-[#eee] cursor-pointer rounded-xl"
                ></label>
                <input
                  type="file"
                  {...register("image")}
                  id="postImg"
                  onChange={handleImageChange}
                  className={cn("w-full text-[14px] text-[#636363]")}
                />
              </div>
            ) : null}
            <div className="w-full min-h-[150px] text-[15px] text-[#74512D]">
              <textarea
                {...register("content")}
                className={cn(
                  "w-full min-h-[150px] outline-none text-pretty resize-none border rounded-xl py-1 px-2",
                  user?.uid !== data?.uid && "border-none bg-white"
                )}
                disabled={user?.uid !== data?.uid}
              ></textarea>
            </div>
            <Comment postId={postId} uid={data?.uid} />
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
        </FormProvider>
      </section>
    </MainLayout>
  );
};

export default FeedDetail;
