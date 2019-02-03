import filter from 'lodash/fp/filter';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import { normalize } from 'normalizr';
import * as paginateLinkTypes from '../../constants/paginateLinkTypes';
import * as requestTypes from '../../constants/requestTypes';
import * as trackTypes from '../../constants/trackTypes';
import trackSchema from '../../schemas/track';
import userSchema from '../../schemas/user';
import { getLazyLoadingUsersUrl } from '../../services/api';
import { isTrack, toIdAndType } from '../../services/track';
import entityStore from '../../stores/entityStore';
import paginateStore from '../../stores/paginateStore';
import requestStore from '../../stores/requestStore';
import userStore from '../../stores/userStore';

export function fetchFollowings(user:any, nextHref?:RequestInfo, ignoreInProgress?:boolean) {
  const requestType = requestTypes.FOLLOWINGS;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'followings?limit=20&offset=0');

  if (requestStore.getRequestByType(requestType) && !ignoreInProgress) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, userSchema);
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      userStore.mergeFollowings(normalized.result);
      paginateStore.setPaginateLink(paginateLinkTypes.FOLLOWINGS, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
}

export function fetchActivities(user?:any, nextHref?:RequestInfo) {
  const requestType = requestTypes.ACTIVITIES;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'activities?limit=20&offset=0');

  if (requestStore.getRequestByType(requestType)) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const typeMap = flow(
        filter(isTrack),
        map(toIdAndType)
      )(data.collection);

      userStore.mergeTypeTracks(filter((v) => v.type === trackTypes.TRACK, typeMap));
      userStore.mergeTypeReposts(filter((v) => v.type === trackTypes.TRACK_REPOST, typeMap));

      const activitiesMap = flow(
        filter(isTrack),
        map('origin')
      )(data.collection);

      const normalized = normalize(activitiesMap, trackSchema);
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      userStore.mergeActivities(normalized.result);

      paginateStore.setPaginateLink(paginateLinkTypes.ACTIVITIES, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
}

export function fetchFollowers(user:any, nextHref?:RequestInfo) {
  const requestType = requestTypes.FOLLOWERS;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'followers?limit=20&offset=0');

  if (requestStore.getRequestByType(requestType)) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, userSchema);
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      userStore.mergeFollowers(normalized.result);
      paginateStore.setPaginateLink(paginateLinkTypes.FOLLOWERS, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
}

export function fetchFavorites(user:any, nextHref?:RequestInfo) {
  const requestType = requestTypes.FAVORITES;
  const url = getLazyLoadingUsersUrl(user, nextHref, 'favorites?linked_partitioning=1&limit=20&offset=0');

  if (requestStore.getRequestByType(requestType)) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, trackSchema);
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      userStore.mergeFavorites(normalized.result);
      paginateStore.setPaginateLink(paginateLinkTypes.FAVORITES, data.next_href);
      requestStore.setRequestInProcess(requestType, false);
    });
}
