import { action, computed, observable } from 'mobx';
import { SORT_FUNCTIONS } from '../../constants/sort';
import * as sortTypes from '../../constants/sortTypes';

class SortStore {

    @observable public sortType:string;

    constructor() {
        this.sortType = sortTypes.NONE;
    }

    @action public setSortType = (sortType:string) => {
        this.sortType = sortType;
    }

    @computed get sortFn() {
        return SORT_FUNCTIONS[this.sortType];
    }

}

const sortStore = new SortStore();

export default sortStore;
export { SortStore };