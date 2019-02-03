import React from 'react';
interface IInputMenu{
    value:string; 
    onChange:()=>void; 
    placeholder:string;
}
function InputMenu({ value, onChange, placeholder }:IInputMenu) {
  return (
    <input
      type="text"
      className="input-menu"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default InputMenu;