import classNames from 'classnames';
import { IKeyValueMap } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { EntityStore } from 'src/stores/entityStore';
import { PlayerStore } from 'src/stores/playerStore';
import { ToggleStore } from 'src/stores/toggleStore';
import * as actions from '../../actions/index';
import ButtonInline from '../../components/ButtonInline';
import TrackPlaylist from '../../components/Track/playlist';
import * as toggleTypes from '../../constants/toggleTypes';


interface IPlaylistItem{
    activity:any;
    entityStore?:EntityStore
    playerStore?:PlayerStore
}
const PlaylistItem = inject('entityStore','playerStore')
(observer(({activity,entityStore,playerStore}:IPlaylistItem) => {
    return (
      <li>
        <TrackPlaylist
          activity={activity}
          userEntities={entityStore!.getEntitiesByKey('users')}
          isPlaying={playerStore!.isPlaying}
          activeTrackId={playerStore!.activeTrackId}
          onActivateTrack={actions.activateTrack}
          onRemoveTrackFromPlaylist={actions.removeTrackFromPlaylist}
        />
      </li>
    );
}));

interface IPlaylistMenu{
    onClearPlaylist:()=>void;
}
const PlaylistMenu = observer(({onClearPlaylist}:IPlaylistMenu) => {
    return (
      <div className="playlist-menu">
        <div>Player Queue</div>
        <div>
          <ButtonInline onClick={onClearPlaylist}>
            Clear Queue
          </ButtonInline>
        </div>
      </div>
    );
});

interface IPlaylist{
    playlistToggle:boolean;
    playlist:any[];
    trackEntities:IKeyValueMap<any>
}
const Playlist = observer(({playlistToggle,playlist,trackEntities}:IPlaylist) => {
    const playlistClass = classNames(
      'playlist',
      {
        'playlist-visible': playlistToggle
      }
    );
  
    return (
      <div className={playlistClass}>
        <PlaylistMenu onClearPlaylist={actions.clearPlaylist} />
        <ul>
          {playlist.map((id, idx) => {
            return <PlaylistItem key={idx} activity={trackEntities[id]} />;
          })}
        </ul>
      </div>
    );
});

interface IPlaylistContainer{
    toggleStore?:ToggleStore;
     playerStore?:PlayerStore;
     entityStore?:EntityStore;
}

const PlaylistContainer = inject('toggleStore','playerStore','entityStore')
(observer(({toggleStore, playerStore,entityStore}:IPlaylistContainer) => {
    return (
      <Playlist
        playlistToggle={toggleStore!.toggles.get(toggleTypes.PLAYLIST)!}
        playlist={playerStore!.playlist}
        trackEntities={entityStore!.getEntitiesByKey('tracks')}
      />
    );
}));

export default PlaylistContainer;
