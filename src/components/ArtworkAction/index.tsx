import classNames from 'classnames';
import React from 'react';

interface IArtworkAction{
    action: () => void,
    isVisible: boolean,
    className: string,
    children: object,
};

function ArtworkAction({ action, isVisible, className, children }:IArtworkAction) {
    const overlayClass = classNames(
    'artwork-action-overlay',
    {
      'artwork-action-overlay-visible': isVisible
    });

return (
    <div className="artwork-action">
      <div>{children}</div>
      <div onClick={action} className={overlayClass}>
        <i className={className} />
      </div>
    </div>
  );
}
export default ArtworkAction;
