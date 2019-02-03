import { IKeyValueMap } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import * as actions from '../../actions/index';
import List from '../../components/List';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as toggleTypes from '../../constants/toggleTypes';
import { ICommonFollowingList, ICommonListContainer } from '../FollowingsList';

interface IFavoritesList extends ICommonFollowingList{
    trackEntities:IKeyValueMap<any>;
    onFetchFavorites:(currentUser:any,nexthref:string)=> void;
}
export function FavoritesList({
  trackEntities,
  nextHref,
  requestInProcess,
  isExpanded,
  favorites,
  currentUser,
  onSetToggle,
  onFetchFavorites
}:IFavoritesList) {
    const setToggle =() => {
        onSetToggle(toggleTypes.FAVORITES)
     }
     const FetchFavorites =() => {
        onFetchFavorites(currentUser, nextHref)
     }
  return (
    <List
      title="Favorites"
      ids={favorites}
      entities={trackEntities}
      nextHref={nextHref}
      requestInProcess={requestInProcess}
      isExpanded={isExpanded}
      currentUser={currentUser}
      onToggleMore={setToggle}
      onFetchMore={FetchFavorites}
      kind="TRACK"
    />
  );
}

const FavoritesListContainer = inject(
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
    <FavoritesList
      trackEntities={entityStore!.getEntitiesByKey('tracks')}
      nextHref={paginateStore!.getLinkByType(paginateLinkTypes.FAVORITES)}
      requestInProcess={requestStore!.getRequestByType(requestTypes.FAVORITES)!}
      isExpanded={toggleStore!.toggles.get(toggleTypes.FAVORITES)!}
      favorites={userStore!.favorites}
      currentUser={sessionStore!.user}
      onFetchFavorites={actions.fetchFavorites}
      onSetToggle={toggleStore!.setToggle}
    />
  );
}));

export default FavoritesListContainer;
