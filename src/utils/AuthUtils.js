import StringConstants from '../constants/StringConstants';
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
  const token = cookies.load(StringConstants.COOKIE_TOKEN);
  return isTokenValid(token);
};

const isRefreshTokenValid = () => {
  const refreshToken = cookies.load(StringConstants.COOKIE_REFRESH_TOKEN);
  return isTokenValid(refreshToken);
};

const getUserDataFromCookie = () => {
  const token = cookies.load(StringConstants.COOKIE_TOKEN);
  if (token) {
    const decoded = jwt.decode(token);
    return decoded;
  }
  return {};
};

const deleteToken = () => {
  cookies.remove(StringConstants.COOKIE_TOKEN);
  cookies.remove(StringConstants.COOKIE_REFRESH_TOKEN);
};

export {
  isAuthenticatedUser,
  isRefreshTokenValid,
  getUserDataFromCookie,
  deleteToken,
};
