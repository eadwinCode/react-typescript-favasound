import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { SortStore } from 'src/stores/sortStore';
import ButtonActive from '../../components/ButtonActive';
import ButtonInline from '../../components/ButtonInline';
import { SORT_NAMES } from '../../constants/sort';
import * as sortTypes from '../../constants/sortTypes';

interface ISort{
    activeSort:any;
    onSetSortType:(para:string)=>void;
}

const Sort =({ activeSort, onSetSortType }:ISort) =>{
    const sortIconClass = classNames(
      'stream-interaction-icon',
      {
        'stream-interaction-icon-active': activeSort !== sortTypes.NONE
      }
    );
    const setSortType = (type:string) =>{
      onSetSortType(type);
    }
    const sortTypesCollection = Object.keys(sortTypes);
    return (
      <div className="stream-interaction">
        <div className={sortIconClass} title={'Sort Stream'}>
          <ButtonInline onClick={setSortType.bind(null,sortTypes.NONE)}>
            <i className="fa fa-sort" />
          </ButtonInline>
        </div>
        <div className="stream-interaction-content">
          {
            sortTypesCollection.map((value, key) => 
                <span key={key}>
                  <ButtonActive onClick={setSortType.bind(null,value)} isActive={value === activeSort}>
                    {SORT_NAMES[value]}
                  </ButtonActive>
                </span>
            )
          }
        </div>
      </div>
    );
  }
  
interface ISortContainer{
    sortStore?:SortStore;
}
const SortContainer = inject('sortStore')
(observer(({sortStore}: ISortContainer) => {
    return (
      <Sort
        activeSort={sortStore!.sortType}
        onSetSortType={sortStore!.setSortType}
      />
    );
}));

export default SortContainer;