import React, { ButtonHTMLAttributes } from 'react';
import '../style.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  width:string;
  onClick: () => void; 
}

const Button: React.FC<ButtonProps> = ({ text,width, onClick, ...rest }: ButtonProps): JSX.Element => {
  return (
      <button
        onClick={onClick}
        className="text-black text-center text font-bold py-2 px-4 mt-2 rounded-full shadow-inner shadow-gray-800 shadow-[0px_4px_6px_rgba(0,0,0,0.3)] transform transition-all duration-200 hover:shadow-[0px_6px_10px_rgba(0,0,0,0.5)] active:translate-y-1"
        style={{
          fontFamily: "Playwrite CU serif",
          fontWeight: 400,
          fontStyle: "normal",
          backgroundColor: "#2C9270",
        }}
        {...rest} 
      >
        {text}
      </button>
    
  );
};

export default Button;
