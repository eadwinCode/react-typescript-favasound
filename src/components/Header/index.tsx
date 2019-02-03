import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { parse } from 'query-string';
import React from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import { SessionStore } from 'src/stores/sessionStore';
import * as actions from '../../actions/index';
import { DEFAULT_GENRE, GENRES } from '../../constants/genre';
import { browse, dashboard } from '../../constants/pathnames';

function getGenreLink(genre:string) {
  const path = browse + '?genre=' + genre;
  return path;
}

function Logo({ genre }:{genre:string}) {
  return (
    <div>
      <Link to={getGenreLink(genre)}>
        <h1>Favesound</h1>
      </Link>
    </div>
  );
}

function MenuItem({ selectedGenre, genre }:{selectedGenre:string;genre:string}) {
  const linkClass = classNames(
    'menu-item',
    {
      'menu-item-selected': genre === selectedGenre
    }
  );

  return (
    <Link to={getGenreLink(genre)} className={linkClass}>
      {genre}
    </Link>
  );
}

function Login({ onLogin }: { onLogin:()=>void; }) {
  return (
    <Link onClick={onLogin} to={dashboard}>
      Login
    </Link>
  );
}

function Logout({ onLogout } : { onLogout:()=>void; }) {
  return (
    <Link onClick={onLogout} to={browse}>
      Logout
    </Link>
  );
}
interface ISessionAction{
    currentUser:any;
    onLogin: ()=>void;
    onLogout: ()=> void;
}
function SessionAction({ currentUser, onLogin, onLogout }:ISessionAction) {
  return (
    <div>
      {currentUser ? <Logout onLogout={onLogout} /> : <Login onLogin={onLogin} />}
    </div>
  );
}
interface IMenuList{
  selectedGenre:string;
}
function MenuList({ selectedGenre }:IMenuList) {
  return (
    <div>
      {GENRES.map((genre, idx) => {
        const menuItemProps = { genre, selectedGenre };
        return <MenuItem key={idx} { ...menuItemProps } />;
      })}
    </div>
  );
}

const Header = inject('sessionStore')(
  observer(({ location, sessionStore }:IHeader) => {
    
    const genre = parse(location.search).genre as string || DEFAULT_GENRE;
    
    const getMenulist= () =>{
        return (<MenuList selectedGenre={genre} />);
    }
    return (
      <div className="header">
        <div className="header-content">
          <Logo genre={genre} />
          <Route exact={true} path={browse} render={getMenulist} />
          <SessionAction currentUser={sessionStore!.user} onLogin={actions.login} onLogout={actions.logout} />
        </div>
      </div>
    );
  }));

interface IHeader{
  sessionStore?: SessionStore;
  location: any;
};

export default withRouter(Header);
