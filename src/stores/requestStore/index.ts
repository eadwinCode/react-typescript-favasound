import { action, observable, ObservableMap } from 'mobx';

class RequestStore {

    @observable public requests:ObservableMap<string,boolean>;
  
    constructor() {
      this.requests = observable.map({});
    }
  
    @action public setRequestInProcess = (requestType:string, inProcess:boolean) => {
      this.requests.set(requestType, inProcess);
    }
  
    public getRequestByType(type:string) {
      return this.requests.get(type);
    }
  
}
const requestStore = new RequestStore();

export default requestStore;
export { RequestStore };
