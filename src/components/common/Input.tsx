import React from "react";

interface InputProps {
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  className: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  onClick,
  className,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={
        className ||
        "w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
      }
      onChange={onChange}
      onClick={onClick}
    />
  );
};

export default Input;
