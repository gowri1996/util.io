import Constants from '../constants/Constants';
import RouteConstants from '../constants/RouteConstants';
import cookies from 'react-cookies';
import isEmpty from 'lodash.isempty';
import jwt from 'jsonwebtoken';

const isTokenValid = (token) => {
  try {
    if (isEmpty(token)) return false;

    const decoded = jwt.decode(token);
    var currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
};

const isAuthenticatedUser = () => {
  const token = cookies.load(Constants.COOKIE_TOKEN);
  return isTokenValid(token);
};

const isRefreshTokenValid = () => {
  const refreshToken = cookies.load(Constants.COOKIE_REFRESH_TOKEN);
  return isTokenValid(refreshToken);
};

const getUserDataFromCookie = () => {
  const token = cookies.load(Constants.COOKIE_TOKEN);
  if (token) {
    const decoded = jwt.decode(token);
    return decoded;
  }
  return {};
};

const deleteToken = () => {
  cookies.remove(Constants.COOKIE_TOKEN, {
    path: RouteConstants.BASE,
  });
  cookies.remove(Constants.COOKIE_REFRESH_TOKEN, {
    path: RouteConstants.BASE,
  });
};

export {
  isAuthenticatedUser,
  isRefreshTokenValid,
  getUserDataFromCookie,
  deleteToken,
};
