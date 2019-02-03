import filter from 'lodash/fp/filter';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { EntityStore } from 'src/stores/entityStore';
import { FilterStore } from 'src/stores/filterStore';
import { PlayerStore } from 'src/stores/playerStore';
import { SortStore } from 'src/stores/sortStore';
import { UserStore } from 'src/stores/userStore';
import * as actions from '../../actions/index';
import FetchOnScroll from '../../components/FetchOnScroll';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackStream from '../../components/Track/stream';
import TrackExtension from '../../components/TrackExtension';
import map from '../../services/map';

export interface IActivitiesProps{
    requestInProcess?: boolean;
    ids?:object;
    entities?:object;
    activeFilter?():void;
    activeSort?(filters:any[]): any[];
}

export interface IActivityProps{
    activity:object;
    idx:number;
    userStore?:UserStore;
    entityStore?:EntityStore;
    playerStore?:PlayerStore;
    sortStore?:SortStore;
    filterStore?:FilterStore;
}

const Activity = inject('userStore','entityStore','playerStore', 'sortStore','filterStore')(
    observer(( props :IActivityProps ) =>{
    return (
        <li>
          <TrackStream
            idx={props.idx}
            activity={props.activity}
            typeReposts={props.userStore!.typeReposts}
            typeTracks={props.userStore!.typeTracks}
            userEntities={props.entityStore!.getEntitiesByKey('users')}
            isPlaying={props.playerStore!.isPlaying}
            activeTrackId={props.playerStore!.activeTrackId}
            activeSortType={props.sortStore!.sortType}
            activeDurationFilterType={props.filterStore!.durationFilterType}
            onActivateTrack={actions.activateTrack}
            // onAddTrackToPlaylist={actions.addTrackToPlaylist}
          />
          <TrackExtension activity={props.activity} />
        </li>
      );
}))

const Activities =  observer(({requestInProcess,ids,entities,activeFilter,activeSort }: IActivitiesProps) => {
    const matchedEntities = map((id) => entities![id],ids);
    const filteredEntities = filter(activeFilter!, matchedEntities);
    const sortedEntities = activeSort!(filteredEntities);
    return (
        <div>
          <div>
            <ul>
            {
                sortedEntities.map((activity, idx:number) => 
                {
                    const activityProps:IActivityProps = { activity, idx };
                    return <Activity key={idx} { ...activityProps } />;
                })
            }
            </ul>
          </div>
          <LoadingSpinner isLoading={requestInProcess || !ids} />
        </div>
    );
});

export default FetchOnScroll(Activities);