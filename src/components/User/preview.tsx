import find from 'lodash/fp/find';
import { observer } from 'mobx-react';
import React from 'react';
import Artwork from '../../components/Artwork';
import Actions from '../../components/HoverActions';
import InfoList from '../../components/InfoList';
import Permalink from '../Permalink';

const UserPreview = observer(({user,followings,onFollow}:IUserPreview) => {
  const { followings_count, followers_count, track_count, avatar_url, username, permalink_url } = user;

  const configuration = [
    {
      className: find((following) => following === user.id, followings) ? 'fa fa-group is-active' : 'fa fa-group',
      fn: () => onFollow(user)
    }
  ];

  const information = [
    {
      className: 'fa fa-plus',
      count: followings_count
    },
    {
      className: 'fa fa-group',
      count: followers_count
    },
    {
      className: 'fa fa-music',
      count: track_count
    }
  ];

  return (
    <div className="item">
      <div>
        <Artwork image={avatar_url} title={username} size={40} />
      </div>
      <div className="item-content">
        <Permalink link={permalink_url} text={username} />
        <InfoList information={information} />
        <Actions configuration={configuration} />
      </div>
    </div>
  );
});

interface IUserPreview{
  followings: any,
  user:any,
  onFollow: (user:any) => void;
};

export default UserPreview;
