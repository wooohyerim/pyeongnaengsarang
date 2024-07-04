import MainLayout from "./layout/MainLayout";

const Loading = () => {
  return (
    <MainLayout>
      {" "}
      <div className="w-full h-screen p-2">
        <span className="text-[#543310] text-[18px] text-center">
          Loading..
        </span>
      </div>
    </MainLayout>
  );
};

export default Loading;
