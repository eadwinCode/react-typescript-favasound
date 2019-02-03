import { forEach } from 'lodash';
import { action,observable, ObservableMap } from 'mobx';

class CommentStore{
    @observable public comments:ObservableMap<number,object[]>;
    @observable public openComments:ObservableMap<number,boolean>;

    constructor(){
        this.comments = observable.map({});
        this.openComments = observable.map({});
    }

    @action public setOpenComments = (id:any) => {
        this.openComments.set(id,!this.openComments.get(id));
    }

    @action public mergeComments = (id:number, comments: object[]) => {
        if(!this.comments.get(id)){
            this.comments.set(id,[]);
        }
        const commentKey = this.comments.get(id);
        forEach(comments, (comment) => commentKey!.push(comment));
    }
}
const commentStore = new CommentStore();

export default commentStore;
export { CommentStore };