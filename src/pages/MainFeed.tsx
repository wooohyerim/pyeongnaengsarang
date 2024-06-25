import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import useUserState from "@/store/useUserState";
import { useNavigate } from "react-router-dom";
useNavigate;

const MainFeed = () => {
  const { setIsLogin } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setIsLogin(true);
      } else {
        console.log("로그아웃");
        setIsLogin(false);
      }
    });
  }, []);

  const onClickLogout = () => {
    alert("로그인 페이지로 이동합니다.");
    auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <p>MainFeed</p>

      <button onClick={onClickLogout} type="button">
        logout
      </button>
    </>
  );
};

export default MainFeed;
