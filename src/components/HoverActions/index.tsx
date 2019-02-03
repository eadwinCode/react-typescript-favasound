import classNames from 'classnames';
import React from 'react';
import ButtonInline from '../../components/ButtonInline';

interface IAction{
    actionItem:any;
}
export function Action({ actionItem }:IAction) {
  return (
    <span className="action-item">
      <ButtonInline onClick={actionItem.fn}>
        <i className={actionItem.className} />
      </ButtonInline>
    </span>
  );
}

function Actions({ configuration, isVisible }:IActions) {
  const actionsClass = classNames(
    'action',
    {
      'action-visible': isVisible
    }
  );

  return (
    <div className={actionsClass}>
      {configuration.map((actionItem, idx) => {
        return <Action key={idx} actionItem={actionItem} />;
      })}
    </div>
  );
}

interface IActions{
  configuration: any[];
  isVisible?:boolean;
};

export default Actions;
