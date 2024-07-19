import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface PropsValue {
  uid: string | undefined;
  dataUid: string;
  dataProfile: string;
  otherProfile: string;
}

const MypageImg = ({ uid, dataUid, dataProfile, otherProfile }: PropsValue) => {
  const { register, watch } = useFormContext();
  const preview = watch("image");
  const [previewImg, setPreviewImg] = useState("");

  // 이미지 업로드 시 미리 보여주는 effect
  useEffect(() => {
    if (preview && preview.length > 0) {
      const file = preview[0];
      setPreviewImg(URL.createObjectURL(file));
    }
  }, [preview]);

  return (
    <div className="flex flex-col items-center justify-between  w-[200px] h-[200px]">
      <label htmlFor="profile">
        {preview && preview.length > 0 ? (
          <img
            className="rounded-full w-[165px] h-[170px]"
            src={previewImg}
            alt="img"
          />
        ) : (
          <img
            className={cn(
              "rounded-full w-[165px] h-[170px]",
              uid !== dataUid && "w-[180px] h-[180px] "
            )}
            src={uid !== dataUid ? otherProfile : dataProfile}
            alt="img"
          />
        )}
      </label>
      <input
        {...register("image")}
        type="file"
        id="profile"
        className={cn(
          "w-full text-[12px] text-[#636363]",
          uid !== dataUid && "hidden"
        )}
        disabled={uid !== dataUid}
        // onChange={(e) => {
        //   const file = e.target.files?.[0];
        //   if (file) {
        //     setValue("image", [file]);
        //   }
        // }}
      />
    </div>
  );
};

export default MypageImg;
