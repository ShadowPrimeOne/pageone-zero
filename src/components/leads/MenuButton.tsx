import React from 'react';

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`!min-w-[120px] !px-6 !py-2 !rounded-xl !border !border-blue-600 !bg-blue-600 !text-white !font-medium !shadow-md hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-pink-400 transition-all duration-150 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default MenuButton; 