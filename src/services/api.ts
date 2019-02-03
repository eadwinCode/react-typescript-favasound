import Cookies from 'js-cookie';
import { CLIENT_ID, TEMP_CLIENT_ID } from '../constants/authentification';

export function unauthApiUrl(url:any, symbol:any) {
  return `//api.soundcloud.com/${url}${symbol}client_id=${CLIENT_ID}`;
}

export function apiUrl(url:any, symbol:any) {
  const accessToken = Cookies.get('accessToken');

  if (!accessToken) { // Fallback
    return unauthApiUrl(url, symbol);
  }

  return `//api.soundcloud.com/${url}${symbol}oauth_token=${accessToken}`;
}

export function addTempClientIdWith(url:any, symbol:any) {
  return `${url}${symbol}client_id=${TEMP_CLIENT_ID}`;
}

export function addAccessTokenWith(url:any, symbol:any) {
  const accessToken = Cookies.get('accessToken');
  if (accessToken) {
    return `${url}${symbol}oauth_token=${accessToken}`;
  } else {
    return `${url}${symbol}client_id=${CLIENT_ID}`;
  }
}

export function getLazyLoadingUsersUrl(user:any, nextHref:any, initHref:any) {
  function getUrlPrefix(u:any) {
    return u ? `users/${u.id}` : `me`;
  }

  if (nextHref) {
    return addAccessTokenWith(nextHref, '&');
  } else {
    return apiUrl(`${getUrlPrefix(user)}/${initHref}`, '&');
  }
}

export function getLazyLoadingCommentsUrl(nextHref:any, initHref:any) {
  if (nextHref) {
    return addAccessTokenWith(nextHref, '&');
  } else {
    return apiUrl(initHref, '&');
  }
}
