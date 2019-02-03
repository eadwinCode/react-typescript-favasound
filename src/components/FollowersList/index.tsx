import { inject, observer } from 'mobx-react';
import React from 'react';
import * as actions from '../../actions/index';
import List from '../../components/List';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as toggleTypes from '../../constants/toggleTypes';
import { ICommonFollowingList, ICommonListContainer } from '../FollowingsList';

interface IFollowersList extends ICommonFollowingList{
    onFetchFollowers:(curreentUser:any,nexthref:string)=>void;
}
export function FollowersList({
  userEntities,
  nextHref,
  requestInProcess,
  isExpanded,
  favorites,
  currentUser,
  onSetToggle,
  onFetchFollowers
}:IFollowersList) {
    const setToggle =() => {
        onSetToggle(toggleTypes.FOLLOWERS)
     }
     const FetchFollowers =() => {
        onFetchFollowers(currentUser, nextHref)
     }
  return (
    <List
      title="Followers"
      ids={favorites}
      entities={userEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={currentUser}
      onToggleMore={setToggle}
      onFetchMore={FetchFollowers}
      kind="USER"
    />
  );
}

const FollowersListContainer = inject(
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
}: ICommonListContainer) => {
  return (
    <FollowersList
      userEntities={entityStore!.getEntitiesByKey('users')}
      nextHref={paginateStore!.getLinkByType(paginateLinkTypes.FOLLOWERS)}
      requestInProcess={requestStore!.getRequestByType(requestTypes.FOLLOWERS)!}
      isExpanded={toggleStore!.toggles.get(toggleTypes.FOLLOWERS)!}
      favorites={userStore!.followers}
      currentUser={sessionStore!.user}
      onFetchFollowers={actions!.fetchFollowers}
      onSetToggle={toggleStore!.setToggle}
    />
  );
}));

export default FollowersListContainer;
