import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { RequestStore } from 'src/stores/requestStore';
import { SessionStore } from 'src/stores/sessionStore';
import FavoritesList from '../../components/FavoritesList';
import FollowersList from '../../components/FollowersList';
import FollowingsList from '../../components/FollowingsList';
import StreamActivities from '../../components/StreamActivities';
import * as requestTypes from '../../constants/requestTypes';

interface IDashboard{
    isAuthInProgress:boolean;
    isLoggedIn:boolean;
}
function Dashboard({ isAuthInProgress, isLoggedIn }:IDashboard) {
  if (isAuthInProgress) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <StreamActivities />
      </div>
      <div className="dashboard-side">
        <FollowingsList />
        <FollowersList />
        <FavoritesList />
      </div>
    </div>
  );
}

const DashboardContainer = inject('sessionStore', 'requestStore')(
  observer(({ sessionStore, requestStore }:IDashboardContainer) => {
    return (
      <Dashboard
        isAuthInProgress={requestStore!.getRequestByType(requestTypes.AUTH)!}
        isLoggedIn={sessionStore!.session}
      />
    );
  }),
);
interface IDashboardContainer{
    sessionStore?:SessionStore; 
    requestStore?:RequestStore;
}


export default DashboardContainer;