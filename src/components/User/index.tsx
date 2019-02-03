import { inject, observer } from 'mobx-react';
import React from 'react';
import { UserStore } from 'src/stores/userStore';
import * as actions from '../../actions/index';
import UserPreview from './preview';

const UserPreviewContainer = inject('userStore')
(observer(({ user,userStore }:IUserPreviewContainer) => {
  return (
    <UserPreview
      followings={userStore!.followings}
      user={user}
      onFollow={actions.follow}
    />
  );
}));

interface IUserPreviewContainer{
  user: any,
  userStore?: UserStore,
};

export default UserPreviewContainer;