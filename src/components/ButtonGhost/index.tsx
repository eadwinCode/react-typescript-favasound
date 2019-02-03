import classNames from 'classnames';
import React, { ReactNode } from 'react';

function ButtonGhost({ onClick, isSmall, children }:IButtonGhost) {
  const buttonGhostClass = classNames(
    'button-ghost',
    {
      'button-ghost-small': isSmall
    }
  );

  return (
    <button className={buttonGhostClass} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

interface IButtonGhost{
  isSmall?: boolean;
  onClick: () => void;
  children?: ReactNode;
};

export default ButtonGhost;