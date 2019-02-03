import React from 'react';
import Artwork from '../../components/Artwork';
import Actions from '../../components/HoverActions';
import { isSameTrack, isSameTrackAndPlaying } from '../../services/player';
import Permalink from '../Permalink';

interface ITrackPlaylist{
    activity: any,
    userEntities: any,
    isPlaying: boolean,
    activeTrackId: number,
    onActivateTrack: (id:number) => void,
    onRemoveTrackFromPlaylist(activity:any):void;
  };
function TrackPlaylist({ activity,userEntities,activeTrackId,isPlaying,onActivateTrack,onRemoveTrackFromPlaylist } : ITrackPlaylist) {
  if (!activity) { return null; }

  const { user, title, permalink_url, artwork_url } = activity;
  const { avatar_url, username } = userEntities[user];

  const trackIsPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);
  const isVisible = isSameTrack(activeTrackId)(activity.id);

  const configuration = [
    {
      className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
      fn: () => onActivateTrack(activity.id),
    },
    {
      className: 'fa fa-times',
      fn: () => onRemoveTrackFromPlaylist(activity)
    }
  ];

  return (
    <div className="playlist-track">
      <div>
        <Artwork image={artwork_url} title={title} optionalImage={avatar_url} size={40} />
      </div>
      <div className="playlist-track-content">
        <Permalink link={permalink_url} text={username + ' - ' + title} />
        <Actions configuration={configuration} isVisible={isVisible} />
      </div>
    </div>
  );
}


  
  export default TrackPlaylist;