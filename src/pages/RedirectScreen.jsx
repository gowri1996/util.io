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
    const redirectUser = async (redirectUrl) => {
      const user = getUserDataFromCookie();
      if (!isEmpty(user)) {
        try {
          const token = cookies.load(StringConstants.COOKIE_TOKEN);
          await dispatch(getUserFromToken(token)).unwrap();

          if (redirectUrl) {
            navigate(redirectUrl, { redirect: true });
            return;
          }
          navigate(RouteConstants.OVERVIEW, { redirect: true });
        } catch (error) {
          console.log(error);
          if (error.status === 401) {
            let refreshToken = cookies.load(
              StringConstants.COOKIE_REFRESH_TOKEN
            );
            try {
              const response = await dispatch(
                refreshTokens(refreshToken)
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
              if (redirectUrl) {
                navigate(redirectUrl, { redirect: true });
                return;
              }
              navigate(RouteConstants.OVERVIEW, { redirect: true });
            } catch (error) {
              console.log(error);
              deleteToken();
              navigate(RouteConstants.LOGIN, { redirect: true });
            }
          } else {
            deleteToken();
            navigate(RouteConstants.LOGIN, { redirect: true });
          }
        }
      } else {
        navigate(RouteConstants.LOGIN, { redirect: true });
      }
    };

    if (location.search) {
      const token = getParamsFromUrl(
        location.search,
        StringConstants.COOKIE_TOKEN
      );
      const refreshToken = getParamsFromUrl(
        location.search,
        StringConstants.COOKIE_REFRESH_TOKEN
      );

      const redirect = getParamsFromUrl(
        location.search,
        RouteConstants.REDIRECT_KEYWORD
      );
      if (!isEmpty(token) && !isEmpty(refreshToken)) {
        cookies.save(StringConstants.COOKIE_TOKEN, token, {
          path: RouteConstants.LOGIN,
        });
        cookies.save(StringConstants.COOKIE_REFRESH_TOKEN, refreshToken, {
          path: RouteConstants.LOGIN,
        });
        redirectUser();
      } else if (!isEmpty(redirect)) {
        const otherParams = getAllParamsAsStringFromUrl(location.search, [
          RouteConstants.REDIRECT_KEYWORD,
        ]);
        redirectUser(redirect + otherParams);
      }
    } else if (isAuthenticatedUser()) {
      redirectUser();
    } else {
      navigate(RouteConstants.LOGIN, { redirect: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <PageLoader title='Loading ...' />;
};

export default RedirectScreen;
