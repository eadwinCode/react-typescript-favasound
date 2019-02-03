import { IKeyValueMap } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { CommentStore } from 'src/stores/commentStore';
import { EntityStore } from 'src/stores/entityStore';
import { PaginateStore } from 'src/stores/paginateStore';
import { RequestStore } from 'src/stores/requestStore';
import * as actions from '../../actions/index';
import Artwork from '../../components/Artwork';
import ButtonMore from '../../components/ButtonMore';
import { getCommentProperty } from '../../services/string';
import { fromNow } from '../../services/track';

interface ICommentExtension{
    activity:any;
    commentIds:any[];
    commentEntities:IKeyValueMap<any>;
    userEntities:IKeyValueMap<any>;
    requestInProcess:boolean;
    nextHref:string;
    onFetchComments:(id:number,nexthref:string)=>void;
}

function CommentExtension({
  activity,
  commentIds,
  commentEntities,
  userEntities,
  requestInProcess,
  nextHref,
  onFetchComments
}:ICommentExtension) {
  const moreButtonProps = 
  {
    // tslint:disable-next-line:object-literal-sort-keys
    onClick: () => onFetchComments(activity.id, nextHref),requestInProcess: requestInProcess || !commentIds,nextHref,
  };

  return (
    <div className="comment-extension">
      {commentIds.map((commentId, key) => {
        const comment = commentEntities[commentId];
        const user = userEntities[comment.user];
        return (
          <div key={key} className="comment-extension-item">
            <Artwork image={user.avatar_url} title={user.username} size={40} />
            <div className="comment-extension-item-body">
              <div className="comment-extension-item-body-header">
                <span>{user.username}</span>
                <span>{fromNow(comment.created_at)}</span>
              </div>
              <div>
                {comment.body}
              </div>
            </div>
          </div>
        );
      })}
      <ButtonMore { ...moreButtonProps } />
    </div>
  );
}

const CommentExtensionContainer = inject(
  'commentStore',
  'entityStore',
  'requestStore',
  'paginateStore'
)(observer(({
  activity,
  commentStore,
  entityStore,
  requestStore,
  paginateStore
}:ICommentExtensionContainer) => {
  return (
    <CommentExtension
      activity={activity}
      commentIds={commentStore!.comments.get(activity.id)!}
      commentEntities={entityStore!.getEntitiesByKey('comments')}
      userEntities={entityStore!.getEntitiesByKey('users')}
      requestInProcess={requestStore!.getRequestByType(getCommentProperty(activity.id))!}
      nextHref={paginateStore!.getLinkByType(getCommentProperty(activity.id))}
      onFetchComments={actions.fetchComments}
    />
  );
}));

interface ICommentExtensionContainer{
  activity: any;
  commentStore?: CommentStore;
  entityStore?: EntityStore;
  requestStore?: RequestStore;
  paginateStore?: PaginateStore;
};

export default CommentExtensionContainer;
