import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CiImageOn } from "react-icons/ci";
import { DocumentData } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { User } from "@/types";

interface FeedImgProp {
  data: DocumentData | undefined;
  postId: string | undefined;
  otherPost: DocumentData | undefined;
  user: User | null;
}

const FeedImg = ({ data, postId, otherPost, user }: FeedImgProp) => {
  const [previewImg, setPreviewImg] = useState<string>("");
  const { register, watch } = useForm();
  // 이미지 업로드 시 미리 보여주는 effect
  const preview = watch("image");
  useEffect(() => {
    if (preview && preview.length > 0) {
      const file = preview[0];
      setPreviewImg(URL.createObjectURL(file));
    }
  }, [preview]);

  return (
    <>
      {data?.photoURL !== "" ? (
        <div className="flex flex-col w-full h-[250px] gap-1">
          <label htmlFor="postImg" className="w-full h-full ">
            {/* {preview && preview.length > 0 ? (
              <img
                className="object-cover w-full h-full"
                src={previewImg}
                alt="img"
              />
            ) : ( */}
            <img
              className="object-cover w-full h-[230px]"
              // src={currentPost?.photoURL}
              src={
                postId !== data?.postId ? otherPost?.photoURL : data?.photoURL
              }
              alt="img"
            />
            {/* )} */}
          </label>
          <input
            type="file"
            {...register("image")}
            id="postImg"
            accept=" .jpg, .png, .jpeg"
            className="w-full text-[14px] text-[#636363] hidden"
          />
        </div>
      ) : user?.uid === data?.uid ? (
        <div className="w-full h-[250px]">
          <label
            htmlFor="postImg"
            className="flex flex-col gap-4 w-full h-full items-center justify-center bg-[#eee] cursor-pointer rounded-xl"
          >
            {preview && preview.length > 0 ? (
              <img
                className="object-cover w-full h-full"
                src={previewImg}
                alt="img"
              />
            ) : (
              <>
                {" "}
                <CiImageOn size={50} style={{ color: "gray" }} />
                <span className="text-[14px] text-[#cecece]">
                  이미지 업로드
                </span>{" "}
              </>
            )}
          </label>
          <input
            type="file"
            {...register("image")}
            id="postImg"
            className={cn("w-full text-[14px] text-[#636363] hidden")}
          />
        </div>
      ) : null}
    </>
  );
};

export default FeedImg;
