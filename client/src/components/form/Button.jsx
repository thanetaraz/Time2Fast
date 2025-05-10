import React from 'react';

const Button = ({
  type = 'submit',
  bgColor = 'bg-blue-500',
  text = 'Submit',
}) => {
  return (
    <button
      type={type}
      className={`cursor-pointer text-white ${bgColor} font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center`}
    >
      {text}
    </button>
  );
};

export default Button;
