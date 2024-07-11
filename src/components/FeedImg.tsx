import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CiImageOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase/firebase";

interface FeedImgProp {
  uid: string;
  postId: string | undefined;
  otherURL: File[] | undefined;
  photoURL: string | undefined;
  dataPostId: string;
}

const FeedImg = ({
  uid,
  postId,
  otherURL,
  photoURL,
  dataPostId,
}: FeedImgProp) => {
  const [previewImg, setPreviewImg] = useState<string>("");
  const user = auth.currentUser;

  const { register, watch } = useForm();
  // 이미지 업로드 시 미리 보여주는 effect
  const preview = watch("image");
  useEffect(() => {
    if (preview && preview.length > 0) {
      const file = preview[0];
      setPreviewImg(URL.createObjectURL(file));
    }
  }, [preview]);

  const currentPhotoURL = postId !== dataPostId ? otherURL : photoURL;

  return (
    <>
      {photoURL !== "" ? (
        <div className="flex flex-col w-full h-[250px] gap-1">
          <label htmlFor="postImg" className="w-full h-full ">
            {preview && preview.length > 0 ? (
              <img
                className="object-cover w-full h-full"
                src={previewImg}
                alt="img"
              />
            ) : (
              <img
                className="object-cover w-full h-[230px]"
                // src={currentPost?.photoURL}
                src={""}
                alt="img"
              />
            )}
          </label>
          <input
            type="file"
            {...register("image")}
            id="postImg"
            accept=" .jpg, .png, .jpeg"
            className="w-full text-[14px] text-[#636363] hidden"
            disabled={user?.uid !== uid}
          />
        </div>
      ) : user?.uid === uid ? (
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
