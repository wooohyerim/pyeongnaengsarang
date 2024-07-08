import React from "react";
import Button from "./common/Button";
import { useFormContext } from "react-hook-form";
import { createComment } from "@/api/comment";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";

interface PropValue {
  postId: string | undefined;
}

interface CommentValue {
  comment: string;
  uid: string;
  nickname: string;
  photoURL: string;
  createAt: Date;
}

const Comment = ({ postId }: PropValue) => {
  const { register, reset, watch } = useFormContext();
  const navigate = useNavigate();
  const comment = watch("comment");

  const handleSubmitComment = async () => {
    const user = auth.currentUser;

    const newComment: CommentValue = {
      comment,
      uid: user?.uid || "",
      nickname: user?.displayName || "Anonymous",
      photoURL: user?.photoURL || "",
      createAt: new Date(),
    };

    try {
      await createComment(newComment, postId || "");
      alert("작성되었습니다.");
      reset();
      // window.location.reload();
    } catch (error) {
      console.log("comment 등록 error =>", error);
    }
  };

  return (
    <div className=" min-h-[150px]">
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
      <div className="flex flex-col w-full bg-purple-100">
        <div className="flex items-center">
          {/* {postUser && postUser.profileImg && (
                      <img
                        src={postUser.profileImg}
                        alt="User Profile"
                        className="w-[30px] h-[30px] rounded-full mr-2"
                      />
                    )} */}
          이미지
          <span className="text-[#74512D] text-[14px] font-IBMSemibold">
            닉네임
          </span>
        </div>
        <p>댓글 내용</p>
      </div>
    </div>
  );
};

export default Comment;
