import { inject, observer } from 'mobx-react';
import React from 'react';
import { EntityStore } from 'src/stores/entityStore';
import { PaginateStore } from 'src/stores/paginateStore';
import { RequestStore } from 'src/stores/requestStore';
import { SessionStore } from 'src/stores/sessionStore';
import { ToggleStore } from 'src/stores/toggleStore';
import { UserStore } from 'src/stores/userStore';
import * as actions from '../../actions/index';
import List from '../../components/List';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as toggleTypes from '../../constants/toggleTypes';

interface IFollowingsList extends ICommonFollowingList{
    onFetchFollowings(currentUser:any,nexthref:string):void;
}
export interface ICommonFollowingList{
  userEntities?:any;
  nextHref:string;
  requestInProcess:boolean;
  isExpanded:boolean;
  favorites:any[];
  currentUser:any;
  onSetToggle:(toggleType:string)=>void;
}

export function FollowingsList({
  userEntities,
  nextHref,
  requestInProcess,
  isExpanded,
  favorites,
  currentUser,
  onSetToggle,
  onFetchFollowings
}:IFollowingsList) {
 const setToggle =() => {
    onSetToggle(toggleTypes.FOLLOWINGS)
 }
 const FetchFollowings =() => {
    onFetchFollowings(currentUser, nextHref)
 }
  return (
    <List
      title="Followings"
      ids={favorites}
      entities={userEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={currentUser}
      onToggleMore={setToggle}
      onFetchMore={FetchFollowings}
      kind="USER"
    />
  );
}

const FollowingsListContainer = inject(
  'sessionStore',
  'userStore',
  'entityStore',
  'paginateStore',
  'requestStore',
  'toggleStore'
)(observer(({
  sessionStore,
  userStore,
  entityStore,
  paginateStore,
  requestStore,
  toggleStore
}:ICommonListContainer) => {
  return (
    <FollowingsList
      userEntities={entityStore!.getEntitiesByKey('users')}
      nextHref={paginateStore!.getLinkByType(paginateLinkTypes.FOLLOWINGS)}
      requestInProcess={requestStore!.getRequestByType(requestTypes.FOLLOWINGS)!}
      isExpanded={toggleStore!.toggles.get(toggleTypes.FOLLOWINGS)!}
      favorites={userStore!.followings}
      currentUser={sessionStore!.user}
      onFetchFollowings={actions.fetchFollowings}
      onSetToggle={toggleStore!.setToggle}
    />
  );
}));

export interface ICommonListContainer{
  sessionStore?: SessionStore;
  userStore?: UserStore;
  entityStore?: EntityStore;
  paginateStore?: PaginateStore;
  requestStore?: RequestStore;
  toggleStore?: ToggleStore;
};

export default FollowingsListContainer;