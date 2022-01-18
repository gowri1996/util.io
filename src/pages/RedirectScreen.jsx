import {
  deleteToken,
  getUserDataFromCookie,
  isAuthenticatedUser,
} from '../utils/AuthUtils';
import {
  getAllParamsAsStringFromUrl,
  getParamsFromUrl,
} from '../utils/UrlUtils';
import { getUserFromToken, refreshTokens } from '../app/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

import PageLoader from '../components/PageLoader';
import RouteConstants from '../constants/RouteConstants';
import StringConstants from '../constants/StringConstants';
import cookies from 'react-cookies';
import isEmpty from 'lodash.isempty';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const RedirectScreen = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function redirectUser(successRedirectionUrl, failureRedirectionUrl) {
      const savedToken = cookies.load(StringConstants.COOKIE_TOKEN);
      const savedRefreshToken = cookies.load(
        StringConstants.COOKIE_REFRESH_TOKEN
      );
      try {
        await dispatch(getUserFromToken(savedToken)).unwrap();
        navigate(successRedirectionUrl, { replace: true });
      } catch (error) {
        console.log(error);
        if (error.status === 401) {
          try {
            const response = await dispatch(
              refreshTokens(savedRefreshToken)
            ).unwrap();
            cookies.save(StringConstants.COOKIE_TOKEN, response.data.token, {
              path: RouteConstants.LOGIN,
            });
            cookies.save(
              StringConstants.COOKIE_REFRESH_TOKEN,
              response.data.refreshToken,
              {
                path: RouteConstants.LOGIN,
              }
            );
            navigate(successRedirectionUrl, { replace: true });
          } catch (error) {
            console.log(error);
            deleteToken();
            navigate(failureRedirectionUrl, { replace: true });
          }
        } else {
          deleteToken();
          navigate(failureRedirectionUrl, { replace: true });
        }
      }
    }

    const securityParam = getParamsFromUrl(
      location.search,
      StringConstants.SECURE_KEYWORD
    );
    const redirect = getParamsFromUrl(
      location.search,
      StringConstants.REDIRECT_KEYWORD
    );
    const otherParams = getAllParamsAsStringFromUrl(location.search, [
      StringConstants.REDIRECT_KEYWORD,
      StringConstants.SECURE_KEYWORD,
    ]);
    const redirectUrl = redirect ? redirect + otherParams : '';

    if (securityParam === StringConstants.UN_SECURE_VALUE) {
      // Unsecure Component
      if (isAuthenticatedUser()) {
        redirectUser(
          RouteConstants.OVERVIEW,
          redirectUrl ? redirectUrl : RouteConstants.LOGIN
        );
      } else {
        if (!isEmpty(getUserDataFromCookie())) {
          redirectUser(
            RouteConstants.OVERVIEW,
            redirectUrl ? redirectUrl : RouteConstants.LOGIN
          );
        } else {
          deleteToken();
          navigate(redirectUrl ? redirectUrl : RouteConstants.LOGIN, {
            replace: true,
          });
        }
      }
    } else if (securityParam === StringConstants.SECURE_VALUE) {
      // Secure Component
      redirectUser(
        redirectUrl ? redirectUrl : RouteConstants.OVERVIEW,
        RouteConstants.LOGIN
      );
    } else {
      // After login step
      const token = getParamsFromUrl(
        location.search,
        StringConstants.COOKIE_TOKEN
      );
      const refreshToken = getParamsFromUrl(
        location.search,
        StringConstants.COOKIE_REFRESH_TOKEN
      );
      if (!isEmpty(token) && !isEmpty(refreshToken)) {
        cookies.save(StringConstants.COOKIE_TOKEN, token, {
          path: RouteConstants.LOGIN,
        });
        cookies.save(StringConstants.COOKIE_REFRESH_TOKEN, refreshToken, {
          path: RouteConstants.LOGIN,
        });

        redirectUser(RouteConstants.OVERVIEW, RouteConstants.LOGIN);
      } else {
        navigate(RouteConstants.LOGIN, { replace: true });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <PageLoader title='Redirecting ...' />;
};

export default RedirectScreen;
