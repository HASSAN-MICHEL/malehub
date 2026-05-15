
import React from "react";
import clsx from "clsx"; 

export const Button = ({
  children,
  className = "",
  onClick,
  size = "md",
  variant = "primary",
  ...props
}) => {
  // Styles de base
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none";

  // Variantes
  const variants = {
    primary: "bg-green-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "bg-transparent hover:bg-gray-100",
  };

  // Tailles
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};