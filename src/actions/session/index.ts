import Cookies from 'js-cookie';
import SC, { Options } from 'soundcloud';
import { fetchActivities, fetchFavorites, fetchFollowers, fetchFollowings } from '../../actions/user';
import { CLIENT_ID, OAUTH_TOKEN, REDIRECT_URI } from '../../constants/authentification';
import { AUTH } from '../../constants/requestTypes';
import { apiUrl } from '../../services/api';
import requestStore from '../../stores/requestStore';
import sessionStore from '../../stores/sessionStore';
import userStore from '../../stores/userStore';

function fetchUser() {
  return fetch(apiUrl(`me`, '?'))
    .then((response) => response.json())
    .then((me) => {
       // tslint:disable-next-line:no-console
    console.log('me',me);
      sessionStore.setMe(me);
      fetchActivities();
      fetchFavorites(me);
      fetchFollowings(me);
      fetchFollowers(me);
    });
}

export function login() {
  const options:Options = {
    client_id:CLIENT_ID,
    redirect_uri:REDIRECT_URI
  }
  SC.initialize(options);
  requestStore.setRequestInProcess(AUTH, true);
  // tslint:disable-next-line:no-debugger
  debugger;
  SC.connect().then(() => {
    const sds = SC.get('/me');
    // tslint:disable-next-line:no-console
    console.log('session',sds);
    // Cookies.set(OAUTH_TOKEN, session.oauth_token);
    // sessionStore.setSession(session);
    fetchUser().then(() => {
      requestStore.setRequestInProcess(AUTH, false);
    });
  }).catch(() => 
  {
    requestStore.setRequestInProcess(AUTH, false);
  });
}

export function logout() {
  Cookies.remove(OAUTH_TOKEN);

  sessionStore.reset();
  userStore.reset();
}
