import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Browse from '../../components/Browse';
import Callback from '../../components/Callback';
import Dashboard from '../../components/Dashboard';
import Header from '../../components/Header';
import Player from '../../components/Player';
import Playlist from '../../components/Playlist';
import { browse, callback, dashboard } from '../../constants/pathnames';

export default class App extends React.Component {
    public render() {
      return (
        <div>
          <Header />
            <Switch>
              <Route exact={true} path={browse} component={Browse} />
              <Route exact={true} path={dashboard} component={Dashboard} />
              <Route exact={true} path={callback} component={Callback} />
              <Redirect to={browse} />
            </Switch>
          <Playlist />
          <Player />
        </div>
      );
    }
}