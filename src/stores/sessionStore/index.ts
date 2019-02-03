import { action, observable } from 'mobx';

class SessionStore {

    @observable public session:any;
    @observable public user:any;
  
    constructor() {
      this.session = null;
      this.user = null;
    }
  
    @action public setMe = (me:any) => {
      this.user = me;
    }
  
    @action public setSession = (session:any) => {
      this.session = session;
    }
  
    @action public reset = () => {
      this.session = null;
      this.user = null;
    }
  
}

const sessionStore = new SessionStore();

export default sessionStore;
export { SessionStore };