
import { find, forEach, remove } from 'lodash';
import { action, observable } from 'mobx';

class UserStore {

  @observable public followings:any;
  @observable public activities:any;
  @observable public followers:any;
  @observable public favorites:any;
  @observable public typeReposts:any;
  @observable public typeTracks:any;

  constructor() {
    this.followings = [];
    this.activities = [];
    this.followers = [];
    this.favorites = [];
    this.typeReposts = {};
    this.typeTracks = {};
  }

  @action public mergeActivities = (ids:any) => {
    forEach(ids, (id) => this.activities.push(id));
  }

  @action public mergeFollowings = (ids:any) => {
    forEach(ids, (id) => this.followings.push(id));
  }

  public isFollowing(userId:any) {
    return !!find(this.followings, (id) => userId === id);
  }

  @action public mergeFollowers = (ids:any) => {
    forEach(ids, (id) => this.followers.push(id));
  }

  @action public mergeFavorites = (ids:any) => {
    forEach(ids, (id) => this.favorites.push(id));
  }

  @action public removeFromFollowings = (userId:any) => {
    remove(this.followings, (id) => userId === id);
  }

  @action public removeFromFavorites = (trackId:any) => {
    remove(this.favorites, (id) => trackId === id);
  }

  @action public mergeTypeTracks = (list:any) => {
    forEach(list, (item) => {
      if (this.typeTracks[item.id]) {
        this.typeTracks[item.id]++;
      } else {
        this.typeTracks[item.id] = 1;
      }
    });
  }

  @action public mergeTypeReposts = (list:any) => {
    forEach(list, (item) => {
      if (this.typeReposts[item.id]) {
        this.typeReposts[item.id]++;
      } else {
        this.typeReposts[item.id] = 1;
      }
    });
  }

  @action public reset = () => {
    this.followings = [];
    this.activities = [];
    this.typeReposts = {};
    this.typeTracks = {};
    this.followers = [];
    this.favorites = [];
  }

}

const userStore = new UserStore();

export default userStore;
export { UserStore };
