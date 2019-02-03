import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { FilterStore } from 'src/stores/filterStore';
import ButtonInline from '../../components/ButtonInline';
import InputMenu from '../../components/InputMenu';

interface IFilterName{
    query:string;
    onSetFilterQuery:(query:string) => void;
}
const FilterName = ({ query, onSetFilterQuery }:IFilterName) => {
  const filterNameIconClass = classNames(
    'stream-interaction-icon',
    {
      'stream-interaction-icon-active': query
    }
  );
  const setFilterQuery = (Query:string) => {
    onSetFilterQuery(Query);
  }
  const setFilterQueryFromEvent = (event:React.FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value.toLowerCase();
    onSetFilterQuery(input);
  }
  return (
    <div className="stream-interaction">
      <div className={filterNameIconClass} title={'Search Stream'}>
        <ButtonInline onClick={setFilterQuery.bind(null,'')}>
          <i className="fa fa-search" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        <InputMenu
          placeholder="SEARCH..."
          onChange={setFilterQueryFromEvent.bind(null,event)}
          value={query}
        />
      </div>
    </div>
  );
}

const FilterNameContainer = inject('filterStore')
(observer(({ filterStore }:IFilterNameContainer) => {
  return (
    <FilterName
      query={filterStore!.query}
      onSetFilterQuery={filterStore!.setFilterQuery}
    />
  );
}));

interface IFilterNameContainer{
  filterStore?: FilterStore
};

export default FilterNameContainer;
