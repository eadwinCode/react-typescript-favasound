import classNames from 'classnames';
import React from 'react';
import ButtonInline from '../../components/ButtonInline';

function ButtonActive({ onClick, isActive, children }:IButtonActive) {
  const buttonActiveClass = classNames(
    'button-active',
    {
      'button-active-selected': isActive
    }
  );

  return (
    <div className={buttonActiveClass}>
      <ButtonInline onClick={onClick}>
        {children}
      </ButtonInline>
    </div>
  );
}

interface IButtonActive{
  isActive:boolean;
  onClick: ()=>void;
  children?: React.ReactNode;
};

export default ButtonActive;