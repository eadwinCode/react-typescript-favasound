import classNames from 'classnames';
import { IKeyValueMap } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import * as actions from '../../actions/index';
import ButtonInline from '../../components/ButtonInline';
import ButtonMore from '../../components/ButtonMore';
import TrackPreview from '../../components/Track/preview';
import UserPreview from '../../components/User';

export function Chevron({ ids, isExpanded }:{ids:any[];isExpanded:boolean;}) {
  const chevronClass = classNames(
    'fa',
    {
      'fa-chevron-down': !isExpanded,
      'fa-chevron-up': isExpanded
    }
  );

  return ids.length > 4 ? <i className={chevronClass} /> : null;
}

const TrackPreviewContainer = inject('entityStore','playerStore')
(observer(({ activity, entityStore,playerStore }) => {
  return (
    <TrackPreview
      activity={activity}
      isPlaying={playerStore.isPlaying}
      activeTrackId={playerStore.activeTrackId}
      userEntities={entityStore.getEntitiesByKey('users')}
      onActivateTrack={actions.activateTrack}
      onAddTrackToPlaylist={actions.addTrackToPlaylist}
    />
  );
}));

function SpecificItemTrack({ entities, trackId }:{entities:IKeyValueMap<any>;trackId:number;}) {
  return (
    <li>
      <TrackPreviewContainer activity={entities[trackId]} />
    </li>
  );
}

function SpecificItemUser({ entities, userId }:{entities:IKeyValueMap<any>;userId:number;}) {
  return (
    <li>
      <UserPreview user={entities[userId]} />
    </li>
  );
}

interface ISpecificList{
    ids:any[];
    kind:string;
    entities:IKeyValueMap<any>;
}

export function SpecificList({ ids, kind, entities }:ISpecificList) {
    if (kind === 'USER') {
        return (
            <div className="list-content">
                <ul>
                {ids.map((id, idx) => {
                    const userProps = { userId: id, entities };
                    return <SpecificItemUser key={idx} { ...userProps } />;
                })}
                </ul>
            </div>
        );
    }
    else{
        return (
            <div className="list-content">
                <ul>
                {ids.map((id, idx) => {
                    const trackProps = { trackId: id, entities };
                    return <SpecificItemTrack key={idx} { ...trackProps } />;
                })}
                </ul>
            </div>
        );
    }
}

export function List({ids, isExpanded,title,kind,requestInProcess,entities,onToggleMore,nextHref,onFetchMore}:IList)
{
  const listClass = classNames({
    'more-visible': isExpanded
  });

  return (
    <div className="list">
      <h2>
        <ButtonInline onClick={onToggleMore}>
          {title} <Chevron ids={ids} isExpanded={isExpanded} />
        </ButtonInline>
      </h2>
      <div className={listClass}>
        <SpecificList
          ids={ids}
          kind={kind}
          entities={entities}
        />
        <ButtonMore
          nextHref={nextHref}
          onClick={onFetchMore}
          requestInProcess={requestInProcess || !ids}
          isHidden={!isExpanded}
        />
      </div>
    </div>
  );
}

interface IList{
  ids: any[];
  isExpanded: boolean;
  title:string;
  kind: string;
  currentUser?:any;
  requestInProcess:boolean;
  entities: IKeyValueMap<any>;
  nextHref: string;
  onToggleMore: () =>void,
  onFetchMore: () => void;
};

export default List;
