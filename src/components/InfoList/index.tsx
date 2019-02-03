import classNames from 'classnames';
import React from 'react';

interface IInfoItem{
    infoItem:any;
}
export function InfoItem({ infoItem }:IInfoItem) {
  const infoItemClass = classNames(
    'info-list-item',
    {
      'info-list-item-active': infoItem.activeSort
    }
  );

  return (
    <div className={infoItemClass}>
      <i className={infoItem.className} /> {infoItem.count}
    </div>
  );
}

function InfoList({ information }: IInfoList) {
  return (
    <div className="info-list">
      { information.map((infoItem, idx) => {
        return <InfoItem key={idx} infoItem={infoItem} />;
      })}
    </div>
  );
}

interface IInfoList{
  information: any[];
};

export default InfoList;
