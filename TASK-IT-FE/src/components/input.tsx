import React, { forwardRef } from "react";

interface InputProps {
  size: "small" | "medium" | "large";
  type: string;
  placeholder?: string;
  className?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const sizeClasses: Record<InputProps["size"], string> = {
  small: "w-[16em] h-9 text-sm px-3",
  medium: "w-[24em] h-11 text-base px-4",
  large: "w-[32em] h-14 text-lg px-5",
};

const InputBox = forwardRef<HTMLInputElement, InputProps>(
  ({ size, className = "", type, placeholder, onKeyDown }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className={`
            ${sizeClasses[size]}
            ${className}
            rounded-xl
            border border-gray-300
            bg-white
            text-gray-800
            placeholder-gray-400
            transition-[box-shadow,transform,border-color] duration-500 ease-out
            hover:border-gray-400
            hover:shadow-md
            hover:scale-105
            focus:outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
            focus:shadow-lg
          `}
        />
      </div>
    );
  }
);

export default InputBox;
