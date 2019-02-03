import React from 'react';
import * as actions from '../../actions/index';
import ButtonGhost from '../../components/ButtonGhost';

function TrackActions({ onOpenComments, onAddTrackToPlaylist }:ITrackActions) {
  const isSmall = true;
  return (
    <div className="track-actions-list">
      <div className="track-actions-list-item">
        <ButtonGhost isSmall={isSmall} onClick={onAddTrackToPlaylist}>
          <i className="fa fa-th-list" /> Add to Playlist
        </ButtonGhost>
      </div>
      <div className="track-actions-list-item">
        <ButtonGhost isSmall={isSmall} onClick={onOpenComments}>
          <i className="fa fa-comment" /> Comment
        </ButtonGhost>
      </div>
    </div>
  );
}

interface ITrackActions{
  onOpenComments: () => void;
  onAddTrackToPlaylist: () => void;
  activity:any;
};

interface ITrackActionsContainer{
    activity:any;
}

function TrackActionsContainer({ activity }: ITrackActionsContainer) {
  return (
    <TrackActions
      activity={activity}
      onOpenComments={actions.openComments.bind(null,activity.id)}
      onAddTrackToPlaylist={actions.addTrackToPlaylist.bind(null,activity)}
    />
  );
}

export default TrackActionsContainer;
