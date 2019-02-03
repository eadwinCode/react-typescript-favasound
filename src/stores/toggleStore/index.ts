import { action, observable, ObservableMap } from 'mobx';

class ToggleStore {
    @observable public toggles:ObservableMap<string,boolean>;

    constructor() {
        this.toggles = observable.map({});
    }

    @action public setToggle = (type:string) => {
        this.toggles.set(type, !this.toggles.get(type));
    }
}

const toggleStore = new ToggleStore();

export default toggleStore;
export { ToggleStore };
