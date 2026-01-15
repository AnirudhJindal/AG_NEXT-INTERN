import React, { type ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary" | "base";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const baseStyles =
  "rounded-3xl  h-10 px-4 text-md font-medium font-sans transition-all duration-400 flex items-center justify-center gap-2";

const variantClasses = {
  primary: "bg-[#5246e7] text-white hover:bg-[#4338ca]",
  secondary: "bg-[#e0e7fe] text-[#6465a5] hover:bg-[#c7d2fe]",
  base : "bg-white border-2 border-[#f3f4f6]"
};

export const ButtonComponent = ({
  varient,
  text,
  startIcon,
  endIcon,
  onClick,
  fullWidth = false,
  loading = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        ${baseStyles}
        ${variantClasses[varient]}
        ${fullWidth ? "w-full" : "w-40"}
        ${loading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02]"}
      `}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}

      
      <span>{loading ? "Loading..." : text}</span>

      
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};
