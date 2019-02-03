export function isSameTrackAndPlaying(activeTrackId:any, trackId:any, isPlaying:boolean) {
    return activeTrackId && isPlaying && activeTrackId === trackId;
  }
  
  export function isSameTrack(trackId:any) {
    return function is(id:any) {
      return trackId && id && trackId === id;
    };
  }