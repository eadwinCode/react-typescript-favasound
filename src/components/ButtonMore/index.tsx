import React from 'react';
import ButtonGhost from '../../components/ButtonGhost';
import LoadingSpinner from '../../components/LoadingSpinner';

function ButtonMore({ onClick, requestInProcess, nextHref, isHidden }:IButtonMore) {
  return (
    <div className="button-more">
      {
        requestInProcess || !nextHref || isHidden ?
        <noscript /> :
        <ButtonGhost onClick={onClick}>More</ButtonGhost>
      }
      <LoadingSpinner isLoading={requestInProcess!} />
    </div>
  );
}

interface IButtonMore {
  nextHref?: string,
  requestInProcess?: boolean,
  isHidden?:boolean,
  onClick:() => void,
};

export default ButtonMore;