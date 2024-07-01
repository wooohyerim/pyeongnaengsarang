import Button from "@/components/common/Button";

import MainLayout from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";

const MainFeed = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="w-full min-h-[700px]">
        <div>
          {" "}
          <Button
            title="글쓰기"
            type="button"
            className="w-[100px] bg-purple-300"
            onClick={() => navigate("/post")}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default MainFeed;
