import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserState } from "@/store/useUserState";
import { getUserProfile, getAllUserData } from "@/hooks/getUserData";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import { UpdateUserValue } from "@/types";
import { updateUser } from "@/api/user";

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useUserState();
  const { uid } = useParams();

  const currentUserId = user?.uid;

  const { register, setValue, handleSubmit } = useForm<UpdateUserValue>();

  // 로그인 한 유저 정보 가져오기
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", user?.uid],
    queryFn: () => getUserProfile(user?.uid || ""),
    enabled: !!user?.uid,
  });

  // 모든 유저 가져오기
  const { data: allUser } = useQuery({
    queryKey: ["allUser", user?.uid],
    queryFn: getAllUserData,
  });

  // 모든 유저 데이터 가져와서 프로필 주소 param 닉네임으로 클릭한 유저 정보
  const otherUser = allUser?.find((user) => user.uid === uid);

  // 현재 유저
  const data = currentUserId === user?.uid ? currentUser : otherUser;
  console.log(data);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching user data:", error);
    return <p>Error loading data</p>;
  }

  if (uid === data?.uid) {
    setValue("nickname", data?.nickname);
    setValue("bio", data?.bio);
    setValue("image", data?.photoURL);
  } else {
    setValue("nickname", otherUser?.nickname);
    setValue("bio", otherUser?.bio);
    setValue("image", otherUser?.profileImg);
  }

  const onUpdateProfile = async (data: UpdateUserValue) => {
    try {
      await updateUser(data);
      alert("수정이 완료되었습니다.");
      navigate("/main");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <MainLayout>
      <section className=" w-full min-h-[760px] pt-4">
        <form
          onSubmit={handleSubmit(onUpdateProfile)}
          className="flex flex-col items-center justify-evenly gap-4 min-h-[600px]"
        >
          <div className="w-[150px] h-[150px] rounded-full">
            <label htmlFor="profile">
              <img
                className={cn(
                  "rounded-full",
                  otherUser?.providerId && "w-full"
                )}
                src={
                  uid !== data?.uid ? otherUser?.profileImg : data?.profileImg
                }
                alt="img"
              />
            </label>
            <input
              {...register("image")}
              type="file"
              id="profile"
              className="hidden"
              disabled={uid !== data?.uid}
            />
          </div>

          <div className="flex flex-col gap-2  justify-between w-[300px]">
            <label className="text-[12px] text-[#74512D]">닉네임</label>
            <input
              className={cn(
                "w-full h-[50px] p-2  text-[#543310] outline-none bg-white rounded-xl border",
                uid !== data?.uid && "bg-[#eee]"
              )}
              type="text"
              {...register(`nickname`)}
              disabled={uid !== data?.uid}
            />
          </div>
          <div className="flex flex-col gap-2 w-[300px] h-[150px] line-clamp-3 text-ellipsis">
            <label className="text-[12px] text-[#74512D]">자기소개</label>
            <textarea
              disabled={uid !== data?.uid}
              {...register("bio")}
              className={cn(
                "w-full h-[110px] p-2 bg-white  rounded-xl outline-none border resize-none overflow-hidden   text-[#543310]",
                uid !== data?.uid && "bg-[#eee]"
              )}
            ></textarea>
          </div>

          <div className="flex w-[300px] gap-6">
            <Button
              onClick={() => navigate(-1)}
              type="button"
              title="돌아가기"
            />
            {uid === data?.uid && <Button type="submit" title="수정하기" />}
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default MyPage;
