import { action, observable } from 'mobx';

class PaginateStore {

    @observable public links:object;

    constructor() {
        this.links = {};
    }

    @action public setPaginateLink = (paginateType:string, nextHref:string) => {
        this.links[paginateType] = nextHref;
    }

    public getLinkByType(paginateType:string) {
        return this.links[paginateType];
    }

}
const paginateStore = new PaginateStore();

export default paginateStore;
export { PaginateStore };