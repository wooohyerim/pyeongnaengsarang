import { useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa6";
import Button from "@/components/common/Button";
import MainLayout from "@/components/layout/MainLayout";

const Post = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="w-[500px] min-h-[720px] pt-5">
        <form className="flex flex-col items-center gap-4 w-[450px] h-full my-0 mx-auto">
          <div className="flex flex-col items-center justify-center w-full h-[250px] bg-[#eee] ">
            <label className="text-center" htmlFor="profile">
              <FaImage size={30} color="gray" />
            </label>
            <input type="file" id="profile" className="hidden" />
          </div>

          <div className="flex flex-col gap-2 w-full h-[60px]">
            <label className="text-[12px] text-[#74512D]">제목</label>
            <input
              type="text"
              className="h-full p-2 border outline-none rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-2 w-full h-[250px]">
            <label className="text-[12px] text-[#74512D]">내용</label>
            <textarea className="w-full h-full p-2 border outline-none rounded-xl"></textarea>
          </div>
          <div className="flex w-[400px] justify-between gap-8">
            <Button title="작성하기" type="submit" />
            <Button
              onClick={() => navigate("/main")}
              title="취소하기"
              type="button"
            />
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Post;
