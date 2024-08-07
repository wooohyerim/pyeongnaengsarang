import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "./common/Button";
import { useFormContext } from "react-hook-form";
import { createComment, deleteComment, updateComment } from "@/api/comment";
import { auth } from "@/firebase/firebase";
import { CommentValue } from "@/types";
import { getPostComment } from "@/utils/getCommentData";
import { cn } from "@/lib/utils";
import LikeComment from "./LikeComment";

interface PropValue {
  postId: string | undefined;
  uid: string;
}

const Comment = ({ postId, uid }: PropValue) => {
  // props uid => 게시글 쓴 유저의 uid
  const { register, reset, watch } = useFormContext();
  const user = auth.currentUser;
  const queryClient = useQueryClient();

  const {
    data: commentData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getPostComment(postId || ""),
  });

  // console.log("comment => ", commentData);

  // 댓글 등록
  const handleSubmitComment = async () => {
    const comment = watch("comment");
    const newComment: CommentValue = {
      comment,
      uid: user?.uid || "",
      nickname: user?.displayName || "Anonymous",
      photoURL: user?.photoURL || "",
      createdAt: new Date(),
    };

    try {
      await createComment(newComment, postId || "");
      alert("작성되었습니다.");
      reset();
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
    } catch (error) {
      console.log("comment 등록 error =>", error);
    }
  };

  // 댓글 삭제
  const handleClickDelete = async (comment_id: string) => {
    try {
      const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
      if (confirmDelete) {
        await deleteComment(postId || "", comment_id);
        queryClient.invalidateQueries({ queryKey: ["comments", postId || ""] });
      }
    } catch (error) {
      console.log("delete comment => ", error);
    }
  };

  // 댓글 수정
  const handleClickUpdate = async (comment_id: string) => {
    const modifyComment = watch(`modifyComment_${comment_id}`);
    try {
      await updateComment(modifyComment, postId || "", comment_id);
      alert("수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["comments", postId || ""] });
    } catch (error) {
      console.log("comment 수정 error =>", error);
    }
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {(error as Error).message}</p>;

  return (
    <div className=" min-h-[150px]">
      {user && (
        <div className="flex justify-between w-full h-[60px]  gap-2  ">
          <input
            {...register("comment")}
            className="w-[400px] h-[40px] outline-none border rounded-xl p-2"
            type="text"
            placeholder="댓글을 입력해주세요."
          />
          <Button
            onClick={handleSubmitComment}
            type="button"
            title="등록"
            className="w-[50px] h-[40px] text-[14px] p-2 border-none bg-[#543310] font-bold text-white rounded-xl "
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        {commentData && commentData?.length > 0 ? (
          commentData?.map((list) => {
            // console.log(list);
            return (
              <div key={list.comment_id} className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {list && list.photoURL && (
                      <img
                        src={list.photoURL}
                        alt="img"
                        className="w-[25px] h-[25px] rounded-full mr-2"
                      />
                    )}
                    <span className="text-[#74512D] text-[14px] font-IBMSemibold">
                      {list.nickname}
                    </span>
                  </div>
                  <LikeComment postId={postId} comment_id={list.comment_id} />
                </div>
                <div className="flex justify-between w-full gap-1">
                  {user?.uid !== list.uid ? (
                    <span className="text-[14px] w-[400px] min-h-[40px]">
                      {list.comment}
                    </span>
                  ) : (
                    <textarea
                      defaultValue={list.comment}
                      {...register(`modifyComment_${list.comment_id}`)}
                      className={cn(
                        "text-[14px] resize-none outline-none  w-[400px]"
                      )}
                    />
                  )}

                  <div className="flex gap-2">
                    {user?.uid === list.uid ? (
                      <>
                        {" "}
                        <span
                          onClick={() =>
                            handleClickDelete(list.comment_id || "")
                          }
                          className="cursor-pointer text-[14px] text-[#cdcdcd]"
                        >
                          삭제
                        </span>
                        <span
                          onClick={() =>
                            handleClickUpdate(list.comment_id || "")
                          }
                          className="cursor-pointer text-[14px] text-[#cdcdcd]"
                        >
                          수정
                        </span>
                      </>
                    ) : user?.uid === uid ? (
                      <span
                        onClick={() => handleClickDelete(list.comment_id || "")}
                        className="cursor-pointer text-[14px] text-[#cdcdcd]"
                      >
                        삭제
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="pl-1 text-[14px] text-gray-500">
            아직 댓글이 없습니다..
          </p>
        )}
      </div>
    </div>
  );
};

export default Comment;
