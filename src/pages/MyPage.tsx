import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import { useUserState } from "@/store/useUserState";
import { getUserProfile } from "@/hooks/getUserData";
import { cn } from "@/lib/utils";

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useUserState();
  const [isClick, setIsClick] = useState(false);

  const { nickname } = useParams();

  const { register, handleSubmit, setValue } = useForm();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", user?.uid],
    queryFn: () => getUserProfile(user?.uid || ""),
    enabled: !!user?.uid,
  });

  // console.log("query로 문서에서 불러온 데이터 => ", data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching user data:", error);
    return <p>Error loading data</p>;
  }

  if (data) {
    setValue("nickname", data.nickname || "");
    setValue("bio", data.bio || "");
    setValue("image", data.photoURL || "");
  }

  // console.log("Mypage => ", user);
  // console.log("params => ", nickname);
  // console.log("네비게이션으로 넘어온 state => ", displayName);

  return (
    <MainLayout>
      <section className=" w-full min-h-[760px] pt-4">
        <form className="flex flex-col items-center justify-evenly gap-4 min-h-[600px]">
          <div className="w-[150px] h-[150px] rounded-full">
            <label htmlFor="profile">
              <img
                className={cn("rounded-full", data?.providerId && "w-full")}
                src={
                  user?.photoURL
                    ? user?.photoURL
                    : "/src/assets/image/profile_user.png"
                }
                alt="img"
              />
            </label>
            <input
              {...register("image")}
              type="file"
              id="profile"
              className="hidden"
            />
          </div>

          <div className="flex flex-col gap-2  justify-between w-[300px]">
            <label className="text-[12px] text-[#74512D]">닉네임</label>
            <input
              className="w-full h-[50px] p-2  text-[#543310] outline-none bg-white rounded-xl border"
              type="text"
              {...register("nickname")}
            />
          </div>
          <div className="flex flex-col gap-2 w-[300px] h-[150px] line-clamp-3 text-ellipsis">
            <label className="text-[12px] text-[#74512D]">자기소개</label>
            <textarea
              {...register("bio")}
              className="w-full h-[110px] p-2 bg-white  rounded-xl outline-none border resize-none overflow-hidden  text-[#543310]"
            ></textarea>
          </div>
          <div className="flex w-[300px] gap-6">
            <Button
              onClick={() => navigate(-1)}
              type="button"
              title="돌아가기"
            />
            <Button type="submit" title="수정하기" />
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default MyPage;
