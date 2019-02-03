import { remove } from 'lodash';
import { action, observable } from 'mobx';

class PlayerStore {

    @observable public activeTrackId:any;
    @observable public isPlaying:boolean;
    @observable public playlist:number[];
  
    constructor() {
      this.activeTrackId = null;
      this.isPlaying = false;
      this.playlist = [];
    }
  
    @action public removeFromPlaylist = (id:number) => {
      remove(this.playlist, (trackId) => trackId === id);
    }
  
    @action public setTrackInPlaylist = (id:number) => {
      this.playlist.push(id);
    }
  
    @action public deactivateTrack = () => {
      this.activeTrackId = null;
    }
  
    @action public setActiveTrack = (id:number) => {
      this.activeTrackId = id;
    }
  
    @action public setIsPlaying = (isPlaying:boolean) => {
      this.isPlaying = isPlaying;
    }
  
    @action public emptyPlaylist = () => {
      this.playlist = [];
    }
  
}
const playerStore = new PlayerStore();

export default playerStore;
export { PlayerStore };