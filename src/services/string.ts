import * as requestTypes from '../constants/requestTypes';

function getCommentProperty(commentId:any) {
  return `${commentId}/${requestTypes.COMMENTS}`;
}

export {
  getCommentProperty
};