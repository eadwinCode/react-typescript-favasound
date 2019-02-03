import { observer } from 'mobx-react';
import React from 'react';
import * as actions from '../../actions/index';
import CommentExtension from '../../components/CommentExtension';
import commentStore from '../../stores/commentStore';


interface ITrackExtension{
    activity: any;
    openComments:(id:number) => void;
    isOpenComment:boolean;
};

function TrackExtension({ activity, isOpenComment } : ITrackExtension) {
  if (isOpenComment) {
    return <CommentExtension activity={activity} />;
  }
  return null;
}

interface ITrackExtensionContainer{
  activity: any,
};
const TrackExtensionContainer = observer(({ activity }:ITrackExtensionContainer) => {
    const openComments = (activityPara:any) => {
        actions.openComments(activityPara.id);
    }
  return (
    <TrackExtension
      activity={activity}
      isOpenComment={commentStore.openComments.get(activity.id)!}
      openComments={openComments.bind(null,activity)}
    />
  );
});


export default TrackExtensionContainer;
