import MainLayout from "./layout/MainLayout";

interface ErrorProps {
  error?: Error | string;
}

const Error = ({ error }: ErrorProps) => {
  const errorMessage = typeof error === "string" ? error : error?.message;
  return (
    <MainLayout>
      {" "}
      <div className="w-full h-[screen]">
        <span className="text-[#543310] text-[18px] text-center">
          Error: {errorMessage}
        </span>
      </div>
    </MainLayout>
  );
};

export default Error;
