import { forEach } from 'lodash';
import { action,observable, ObservableMap } from 'mobx';

class EntityStore{
    @observable public entities:ObservableMap<string,ObservableMap<number,any>>;

    constructor(){
        this.entities = observable.map({});
    }

    @action public syncEntities = (entity:any, key:string) => {
        this.entities.get(key)!.set(entity.id, entity);
    }
    
    @action public mergeEntities = (key:string, entities:object[]) => {
        if (!this.entities.get(key)) {
            this.entities.set(key, observable.map({}));
        }
        const keyValue = this.entities.get(key);
        forEach(entities,(entity, entityKey) => {
            keyValue!.set(entityKey, entity);
        });
    }
    
    public getEntitiesByKey(key:string) {
        const entities = this.entities.get(key);
        return entities ? entities.toJSON() : {};
    }
}
const entityStore = new EntityStore();

export default entityStore;
export { EntityStore };