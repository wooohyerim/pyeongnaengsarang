import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { AuthValues } from "@/types";
import Button from "@/components/common/Button";
import { useUserState } from "@/store/useUserState";
import { saveGoogleUser, signInWithEmail } from "@/api/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useUserState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthValues>();

  const goToSignup = () => {
    navigate("/signup");
  };

  const onSubmit = async (data: AuthValues) => {
    try {
      const user: User = await signInWithEmail(data);
      setUser(user);
      setIsLogin(true);
      alert("로그인에 성공했습니다.");
      reset();
      navigate("/main");
    } catch (error) {
      console.error("Login failed: ", error);
      alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  // 구글 로그인
  const signInGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);
      const user = data.user;
      setUser(user);
      await saveGoogleUser(user);
      navigate("/main");
      return user;
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section>
      <div className="flex flex-col w-[500px] h-screen my-0 mx-auto p-3 bg-[#F8F0E5]">
        <span
          onClick={() => navigate("/")}
          className="w-[30px] text-[24px] font-bold text-[#543310] cursor-pointer"
        >
          &lt;{" "}
        </span>
        <h1 className="mb-6 text-center text-[36px] text-[#543310] font-IBMSemibold ">
          로그인
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-[400px] h-[400px] my-0 mx-auto p-4 "
        >
          <div className="flex flex-col gap-1 h-[80px]">
            <label className="text-[#636363] text-[12px]">이메일 *</label>
            <input
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-.]+$/,
                  message: "유효한 이메일 주소를 입력해주세요.",
                },
                required: "이메일을 입력해주세요.",
              })}
              className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
              type="text"
            />
            {errors.email && (
              <span className="pl-1 text-[#ff0000] text-[12px]">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 h-[80px]">
            <label className="text-[#636363] text-[12px]">비밀번호 *</label>
            <input
              {...register("password", {
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "영문 + 숫자 + 특수문자 8자 이상 입력해주세요.",
                },
                required: "비밀번호를 입력해주세요.",
              })}
              className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
              type="password"
            />
            {errors.password && (
              <span className="pl-1 text-[#ff0000] text-[12px]">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <Button type={"submit"} title={"로그인"} />
            <Button
              onClick={signInGoogle}
              type={"button"}
              title={"구글 로그인"}
            />
          </div>
        </form>
        <div className=" w-full p-4 gap-4 text-[#D1BB9E] text-center text-[14px]">
          <span> 아직 계정이 없으면 | </span>
          <span
            onClick={goToSignup}
            className="underline cursor-pointer underline-offset-4"
          >
            회원가입
          </span>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
