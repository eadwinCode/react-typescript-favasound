import { normalize } from 'normalizr';
import commentSchema from '../../schemas/comment';
import { getLazyLoadingCommentsUrl } from '../../services/api';
import { getCommentProperty } from '../../services/string';
import commentStore from '../../stores/commentStore';
import entityStore from '../../stores/entityStore';
import paginateStore from '../../stores/paginateStore';
import requestStore from '../../stores/requestStore';

export function fetchComments(trackId:any, nextHref?:any) {
  const requestProperty = getCommentProperty(trackId);
  const initUrl = 'tracks/' + trackId + '/comments?linked_partitioning=1&limit=20&offset=0';
  const url = getLazyLoadingCommentsUrl(nextHref, initUrl);

  if (requestStore.getRequestByType(requestProperty)) { return; }

  requestStore.setRequestInProcess(requestProperty, true);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const normalized = normalize(data.collection, commentSchema);
      entityStore.mergeEntities('tracks', normalized.entities.tracks);
      entityStore.mergeEntities('users', normalized.entities.users);
      entityStore.mergeEntities('comments', normalized.entities.comments);
      commentStore.mergeComments(trackId, normalized.result);
      paginateStore.setPaginateLink(requestProperty, data.next_href);
      requestStore.setRequestInProcess(requestProperty, false);
    });
}

export function openComments(trackId:any) {
  const comments = commentStore.comments.get(trackId);
  commentStore.setOpenComments(trackId);

  if (!comments) {
    fetchComments(trackId);
  }
}