import { normalize } from 'normalizr';
import * as requestTypes from '../../constants/requestTypes';
import trackSchema from '../../schemas/track';
import { unauthApiUrl } from '../../services/api';
import browseStore from '../../stores/browseStore';
import entityStore from '../../stores/entityStore';
import paginateStore from '../../stores/paginateStore';
import requestStore from '../../stores/requestStore';

export function fetchActivitiesByGenre(nextHref:any, genre:any) {
  const requestType = requestTypes.GENRES;
  const initHref = unauthApiUrl(`tracks?linked_partitioning=1&limit=20&offset=0&tags=${genre}`, '&');
  const url = nextHref || initHref;

  if (requestStore.getRequestByType(requestType)) { return; }

  requestStore.setRequestInProcess(requestType, true);

  return fetch(url)
    .then(response => {
      const responseJson = response.json();
      responseJson.then(data => {
        const normalized = normalize(data.collection, trackSchema);
        entityStore.mergeEntities('tracks', normalized.entities.tracks);
        entityStore.mergeEntities('users', normalized.entities.users);
        browseStore.mergeActivitiesByGenre(genre, normalized.result);
        paginateStore.setPaginateLink(genre, data.next_href);
        requestStore.setRequestInProcess(requestType, false)
      })
    });
}