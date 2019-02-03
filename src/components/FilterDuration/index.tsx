import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { FilterStore } from 'src/stores/filterStore';
import ButtonActive from '../../components/ButtonActive';
import ButtonInline from '../../components/ButtonInline';
import { DURATION_FILTER_NAMES } from '../../constants/durationFilter';
import * as filterTypes from '../../constants/filterTypes';

function hasActiveFilter(activeDurationFilter:string) {
  const { FILTER_DURATION_TRACK, FILTER_DURATION_MIX } = filterTypes;
  return activeDurationFilter === FILTER_DURATION_TRACK || activeDurationFilter === FILTER_DURATION_MIX;
}
interface IFilterDuration{
    durationFilterType:string;
    onSetFilterDuration:(value:string)=>void;
}

const FilterDuration = ({ durationFilterType, onSetFilterDuration}:IFilterDuration) =>{
    const sdsd = new Array<number>();
    const filterDurationIconClass = classNames(
        'stream-interaction-icon',
        {
        'stream-interaction-icon-active': hasActiveFilter(durationFilterType)
        }
    );
    
    const SetFilterDuration =(value:string) => {
        onSetFilterDuration(value)
    }
    const filterTypesCollection = Object.keys(filterTypes);
    return (
        <div className="stream-interaction">
        <div className={filterDurationIconClass} title={'Filter Stream'}>
            <ButtonInline onClick={SetFilterDuration.bind(null,filterTypes.ALL)}>
                <i className="fa fa-filter" />
            </ButtonInline>
        </div>
        <div className="stream-interaction-content">
            {
            filterTypesCollection.map((value, key) =>
                <span key={key}>
                    <ButtonActive onClick={SetFilterDuration.bind(null,value)} isActive={value === durationFilterType}>
                    {DURATION_FILTER_NAMES[value]}
                    </ButtonActive>
                </span>)
            }
        </div>
        </div>
    );
}

const FilterDurationContainer = inject('filterStore')(
observer(({ filterStore }:IFilterDurationContainer) => {
  return (
    <FilterDuration
      durationFilterType={filterStore!.durationFilterType}
      onSetFilterDuration={filterStore!.setFilterDuration}
    />
  );
}));

interface IFilterDurationContainer{
  filterStore?: FilterStore
};

export default FilterDurationContainer;