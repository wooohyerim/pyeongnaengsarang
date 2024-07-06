import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa6";
import Button from "@/components/common/Button";
import MainLayout from "@/components/layout/MainLayout";
import { createPost } from "@/api/post";
import { PostValue } from "@/types";

// interface PostValue {
//   image?: File[] | undefined;
//   title: string;
//   content: string;
// }

const Post = () => {
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostValue>();

  // 이미지 업로드 시 미리 보여주는 effect
  const preview = watch("image");
  useEffect(() => {
    if (preview && preview.length > 0) {
      const file = preview[0];
      setPreviewImg(URL.createObjectURL(file));
    }
  }, [preview]);

  const handlePostContent = async (data: PostValue) => {
    try {
      await createPost(data);
      alert("작성되었습니다.");
      reset();
      navigate("/main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="w-[500px] h-[750px] pt-2">
        <form
          onSubmit={handleSubmit(handlePostContent)}
          className="flex flex-col items-center gap-6 w-[450px] my-2 mx-auto"
        >
          <div className="flex flex-col items-center justify-center w-full h-[230px]">
            <label
              className="flex flex-col items-center justify-center h-[230px] text-center"
              htmlFor="profile"
            >
              {preview && preview.length > 0 ? (
                <img className="w-full h-[230px]" src={previewImg} alt="img" />
              ) : (
                <>
                  <FaImage size={30} color="gray" />
                  <span className="text-[12px]">이미지 업로드</span>
                </>
              )}
            </label>
            <input
              {...register("image")}
              type="file"
              accept=" .jpg, .png, .jpeg"
              id="profile"
              className="hidden"
            />
          </div>

          <div className="flex flex-col gap-2 w-full h-[60px]  mb-2">
            <label className="text-[12px] text-[#74512D]">제목 *</label>
            <input
              {...register("title", { required: "제목을 입력해주세요." })}
              type="text"
              className="h-full p-2 border outline-none rounded-xl"
            />
            {errors.title && (
              <span className="pl-1 text-[#ff0000] text-[12px]">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full h-[250px]">
            <label className="text-[12px] text-[#74512D]">내용 *</label>
            <textarea
              {...register("content", { required: "내용을 입력해주세요." })}
              className="w-full h-[180px] p-2 border outline-none rounded-xl"
            ></textarea>
            {errors.content && (
              <span className="pl-1 text-[#ff0000] text-[12px]">
                {errors.content.message}
              </span>
            )}
          </div>
          <div className="flex justify-between w-full gap-8">
            <Button
              onClick={() => navigate("/main")}
              title="취소하기"
              type="button"
            />
            <Button title="작성하기" type="submit" />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Post;
