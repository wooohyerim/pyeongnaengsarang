import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import Button from "@/components/common/Button";
import { FirebaseError } from "firebase/app";

type FormValues = {
  image: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  bio: string;
};

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const profileImg = watch("image");

  // image 이름 가져오기
  const getFileName = (fileList: any) => {
    // console.log(fileList);
    return fileList && fileList.length > 0 ? fileList[0]?.name : "";
  };

  const onSubmit = async (data: FormValues) => {
    // console.log(data.email, data.password, data.nickname);
    // console.log(data.image);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = credential.user;
      console.log(user);

      await updateProfile(user, {
        displayName: data.nickname,
      });
    } catch (error: unknown) {
      const err = error as FirebaseError;
      switch (err.code) {
        case "auth/invalid-email":
          alert("이메일을 바르게 입력해주세요.");
          break;
        case "auth/weak-password":
          alert("비밀번호가 너무 쉬워요.");
          break;
        case "auth/email-already-in-use":
          alert("등록된 이메일 입니다.");
          break;
        default:
          console.log("회원가입 실패");
          break;
      }
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-[450px] h-full my-6 mx-auto p-3">
      <span
        onClick={() => navigate(-1)}
        className="w-[30px] text-[24px] font-bold text-[#543310] cursor-pointer lg:hidden"
      >
        &lt;{" "}
      </span>
      <h1 className=" mb-6 text-center text-[36px] text-[#543310] font-IBMSemibold ">
        Sign Up
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[400px] h-full my-0 mx-auto p-4"
      >
        <div className="flex flex-col gap-1 h-[60px]">
          <label
            htmlFor="image"
            className="w-[130px] h-8 text-center p-1 bg-[#D1BB9E] rounded-[4px] text-white cursor-pointer hover:bg-[#74512D] "
          >
            profile upload!
          </label>{" "}
          <div className="text-[#D1BB9E] pl-1 ">
            {profileImg && profileImg.length > 0 && getFileName(profileImg)}
          </div>
          <input
            type={"file"}
            accept=".gif, .jpg, .png, .pdf, .jpeg"
            {...register("image", { required: "이미지를 등록해주세요." })}
            id={"image"}
            className="hidden"
          />
          {errors.image && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.image?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">Name</label>
          <input
            {...register("name", {
              minLength: 2,
              required: "이름을 입력해주세요.",
            })}
            className={
              "w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            }
            type={"text"}
          />
          {errors.name && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">Nickname</label>
          <input
            {...register("nickname", {
              minLength: 2,
              required: "닉네임을 입력해주세요.",
            })}
            className={
              "w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            }
            type={"text"}
          />
          {errors.nickname && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.nickname.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">Email</label>
          <input
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-.]+$/,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
              required: "이메일을 입력해주세요.",
            })}
            className={
              "w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            }
            type={"text"}
          />
          {errors.email && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">Password</label>
          <input
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "영문 + 숫자 + 특수문자 8자 이상 입력해주세요.",
              },
              required: "비밀번호를 입력해주세요.",
            })}
            className={
              "w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            }
            type={"password"}
          />
          {errors.password && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">Comment</label>
          <input
            {...register("bio", {
              minLength: 3,
              required: "인사말을 입력해주세요.",
            })}
            className={
              "w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            }
            type={"text"}
          />
          {errors.bio && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.bio.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <Button className={""} type={"submit"} title={"가입하기"} />
          <Button
            className={
              "hidden lg:block w-full h-[55px] p-2 border-none bg-[#543310] outline-none text-white text-lg font-bold rounded-[4px]"
            }
            type={"button"}
            title={"돌아가기"}
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
      <div className="w-full p-4 text-[#D1BB9E]  text-center text-[14px]">
        <span> 이미 계정이 있다면 | </span>
        <span
          onClick={goToLogin}
          className="underline cursor-pointer underline-offset-4"
        >
          로그인
        </span>
      </div>
    </div>
  );
};

export default SignupForm;