import { action, computed, observable } from 'mobx';
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter';
import * as filterTypes from '../../constants/filterTypes';
import { getTracknameFilter } from '../../constants/nameFilter';
import { getAndCombined } from '../../services/filter';

class FilterStore {

    @observable public durationFilterType:string;
    @observable public query:string;
  
    constructor() {
      this.durationFilterType = filterTypes.ALL;
      this.query = '';
    }
  
    @action public setFilterDuration = (filterType:string) => {
      this.durationFilterType = filterType;
    }
  
    @action public setFilterQuery = (query:string) => {
      this.query = query;
    }
  
    @computed get combinedFilters() {
      return getAndCombined([
        DURATION_FILTER_FUNCTIONS[this.durationFilterType],
        getTracknameFilter(this.query)
      ]);
    }
}
const filterStore = new FilterStore();

export default filterStore;
export { FilterStore };