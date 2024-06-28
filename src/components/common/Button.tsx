import React from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  title: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type, title, onClick, className }) => {
  return (
    <button
      type={type}
      className={
        className ||
        "w-full h-[55px] p-2 border-none bg-[#543310] outline-none text-white text-lg font-bold rounded-[4px]"
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
