import React from 'react';
import { UserStore } from 'src/stores/userStore';
import Artwork from '../../components/Artwork';
import Actions from '../../components/HoverActions';
import InfoList from '../../components/InfoList';
import { isSameTrack, isSameTrackAndPlaying } from '../../services/player';
import Permalink from '../Permalink';

interface ITrackPreview{
  userEntities: UserStore;
  activity: any;
  isPlaying: boolean;
  activeTrackId: number;
  onActivateTrack: (id:number) => void;
  onAddTrackToPlaylist: (activity:any) => void;
};
function TrackPreview({activity,isPlaying,activeTrackId,userEntities,onActivateTrack,onAddTrackToPlaylist}:ITrackPreview) 
{
  const { avatar_url, username } = userEntities[activity.user];
  const { playback_count, favoritings_count, comment_count, permalink_url, artwork_url } = activity;

  const isVisible = isSameTrack(activeTrackId)(activity.id);
  const trackIsPlaying = isSameTrackAndPlaying(activeTrackId, activity.id, isPlaying);

  const configuration = [
    {
      className: trackIsPlaying ? 'fa fa-pause' : 'fa fa-play',
      fn: () => onActivateTrack(activity.id),
    },
    {
      className: 'fa fa-th-list',
      fn: () => onAddTrackToPlaylist(activity)
    }
  ];

  const information = [
    {
      className: 'fa fa-play',
      count: playback_count
    },
    {
      className: 'fa fa-heart',
      count: favoritings_count
    },
    {
      className: 'fa fa-comment',
      count: comment_count
    }
  ];

  return (
    <div className="item">
      <div>
        <Artwork image={artwork_url} title={activity.title} optionalImage={avatar_url} size={40} />
      </div>
      <div className="item-content">
        <Permalink link={permalink_url} text={username + ' - ' + activity.title} />
        <InfoList information={information} />
        <Actions configuration={configuration} isVisible={isVisible} />
      </div>
    </div>
  );
}


export default TrackPreview;
