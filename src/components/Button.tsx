import React from "react";

interface ButtonProps {
  handlefunction: () => void;
  children: string;
}

const Button: React.FC<ButtonProps> = ({ handlefunction, children }) => {
  return (
    <button className="btn" onClick={handlefunction}>
      {children}
    </button>
  );
};

export default Button;
