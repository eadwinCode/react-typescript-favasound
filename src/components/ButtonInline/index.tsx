import React, {ReactNode } from 'react';

function ButtonInline({ onClick, children }:IButtonInline) {
  return (
    <button className="button-inline" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

interface IButtonInline{
  onClick: () => void;
  children?: ReactNode;
};

export default ButtonInline;