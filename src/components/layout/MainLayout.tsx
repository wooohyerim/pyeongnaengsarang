import React from "react";
import Header from "../Header";
import NavBar from "../NavBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <section className=" w-[500px] mx-auto my-0 bg-white border border-s-[#dadada] border-y-0  shadow-inner">
        <Header />

        {children}
        <NavBar />
      </section>
    </div>
  );
};

export default MainLayout;
