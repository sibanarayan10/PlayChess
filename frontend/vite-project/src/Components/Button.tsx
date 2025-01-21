import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  width:string;
  height:string;
  onClick: () => void; 
}

const Button: React.FC<ButtonProps> = ({ text,width,height, onClick, ...rest }: ButtonProps): JSX.Element => {
  return (
    <div className={`rounded-full m-2 ${width} ${height} text-left flex justify-center mx-5`}>
      <button
        onClick={onClick}
        className="text-black text-center w-full text-lg font-bold px-4 py-2 rounded-full shadow-inner shadow-gray-800 shadow-[0px_4px_6px_rgba(0,0,0,0.3)] transform transition-all duration-200 hover:shadow-[0px_6px_10px_rgba(0,0,0,0.5)] active:translate-y-1"
        style={{
          fontFamily: "Playwrite CU serif",
          fontOpticalSizing: "auto",
          fontWeight: 400,
          fontStyle: "normal",
          backgroundColor: "#2C9270",
        }}
        {...rest} // Spread other button props, including type, disabled, etc.
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
