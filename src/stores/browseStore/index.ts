import { forEach } from 'lodash';
import { action,observable, ObservableMap } from 'mobx';

class BrowseStore{
    @observable public activitiesByGenre : ObservableMap<string,any[]>;

    constructor(){
        this.activitiesByGenre = observable.map({});
    }

    @action public mergeActivitiesByGenre = (genre:string, list:object[]) => {
        if(!this.activitiesByGenre.get(genre)){
            this.activitiesByGenre.set(genre,[]);
        }
        const genreMap = this.activitiesByGenre.get(genre);
        forEach(list,(item)=> genreMap!.push(item));
    }

    public getByGenre(genre:string) {
        const ds = this.activitiesByGenre.get(genre);
        return ds;
    }
}

const browseStore = new BrowseStore();

export default browseStore;
export { BrowseStore };