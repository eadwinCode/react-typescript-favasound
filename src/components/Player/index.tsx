import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { EntityStore } from 'src/stores/entityStore';
import { PlayerStore } from 'src/stores/playerStore';
import { SessionStore } from 'src/stores/sessionStore';
import { ToggleStore } from 'src/stores/toggleStore';
import * as actions from '../../actions/index';
import ButtonInline from '../../components/ButtonInline';
import * as toggleTypes from '../../constants/toggleTypes';
import { addAccessTokenWith } from '../../services/api';

interface IPlayer{
    sessionStore?: SessionStore,
    entityStore?: EntityStore,
    playerStore?: PlayerStore,
    toggleStore?: ToggleStore,
}


@inject('sessionStore', 'entityStore', 'playerStore', 'toggleStore')
@observer
class Player extends React.Component<IPlayer> {
    private audioElementRef:any;
    constructor(props:IPlayer){
      super(props)
      this.audioElementRef = React.createRef<HTMLAudioElement>();
    }
    public render() {
      const { sessionStore, entityStore, playerStore } = this.props;
      const { activeTrackId, isPlaying, playlist } = playerStore!;
      const userEntities = entityStore!.getEntitiesByKey('users');
      const trackEntities = entityStore!.getEntitiesByKey('tracks');
  
      if (!activeTrackId) { return null; }
  
      const track = trackEntities[activeTrackId];
      const { user, title, stream_url } = track;
      const { username } = userEntities[user];
  
      const playerClass = classNames(
        'player',
        {
          'player-visible': activeTrackId
        }
      );
  
      const playClass = classNames(
        'fa',
        {
          'fa-pause': isPlaying,
          'fa-play': !isPlaying
        }
      );
  
      const likeClass = classNames(
        'fa fa-heart',
        {
          'is-favorite': track.user_favorite
        }
      );
  
      return (
        <div className={playerClass}>
          <div className="player-content">
            <div className="player-content-action">
              <ButtonInline onClick={this.activateIteratedTrack.bind(null,activeTrackId, -1)}>
                <i className="fa fa-step-backward" />
              </ButtonInline>
            </div>
            <div className="player-content-action">
              <ButtonInline onClick={this.togglePlayTrack.bind(null,isPlaying)}>
                <i className={playClass} />
              </ButtonInline>
            </div>
            <div className="player-content-action">
              <ButtonInline onClick={this.activateIteratedTrack.bind(null,activeTrackId, 1)}>
                <i className="fa fa-step-forward" />
              </ButtonInline>
            </div>
            <div className="player-content-name">
              {username} - {title}
            </div>
            <div className="player-content-action">
              <ButtonInline onClick={this.setToggle}>
                <i className="fa fa-th-list" /> {playlist.length}
              </ButtonInline>
            </div>
            <div className="player-content-action">
              {
                sessionStore!.user ?
                  <ButtonInline onClick={this.likeAction.bind(null,track)}>
                    <i className={likeClass} />
                  </ButtonInline> : null
              }
            </div>
            <audio id="audio" ref={this.audioElementRef} src={addAccessTokenWith(stream_url, '?')}/>
          </div>
        </div>
      );
    }
    public componentDidUpdate() {
      const audioElement = this.audioElementRef.current as HTMLAudioElement;
  
      if (!audioElement) { return; }
  
      if (this.props.playerStore!.isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
    private setToggle = () =>{
      this.props.toggleStore!.setToggle(toggleTypes.PLAYLIST);
    }

    private likeAction = (track:any) => {
      actions.like(track);
    }
    private activateIteratedTrack = (activeTrackId:number, pos:number) => {
      actions.activateIteratedTrack(activeTrackId, pos);
    }
    private togglePlayTrack = (isPlaying:boolean) => {
      actions.togglePlayTrack(!isPlaying)
    }
}
export default Player;