import isEmpty from "lodash.isempty";
import { useEffect } from "react";
import cookies from "react-cookies";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getUserFromToken, refreshTokens } from "../app/slices/userSlice";
import PageLoader from "../components/PageLoader";
import Constants from "../constants/Constants";
import RouteConstants from "../constants/RouteConstants";
import {
  deleteToken,
  getUserDataFromCookie,
  isAuthenticatedUser,
} from "../utils/AuthUtils";
import {
  getAllParamsAsStringFromUrl,
  getParamsFromUrl,
} from "../utils/UrlUtils";

const RedirectScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // add 1 year

    async function redirectUser(successRedirectionUrl, failureRedirectionUrl) {
      const savedToken = cookies.load(Constants.COOKIE_TOKEN);
      const savedRefreshToken = cookies.load(Constants.COOKIE_REFRESH_TOKEN);
      try {
        await dispatch(getUserFromToken(savedToken)).unwrap();
        navigate(successRedirectionUrl, { replace: true });
      } catch (error) {
        console.log(error);
        if (error.status === 401) {
          try {
            const response = await dispatch(
              refreshTokens(savedRefreshToken),
            ).unwrap();
            cookies.save(Constants.COOKIE_TOKEN, response.data.token, {
              path: RouteConstants.BASE,
              expires,
            });
            cookies.save(
              Constants.COOKIE_REFRESH_TOKEN,
              response.data.refreshToken,
              {
                path: RouteConstants.BASE,
                expires,
              },
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
      Constants.SECURE_KEYWORD,
    );
    const redirect = getParamsFromUrl(
      location.search,
      Constants.REDIRECT_KEYWORD,
    );
    const otherParams = getAllParamsAsStringFromUrl(location.search, [
      Constants.REDIRECT_KEYWORD,
      Constants.SECURE_KEYWORD,
    ]);
    const redirectUrl = redirect ? redirect + otherParams : "";

    if (securityParam === Constants.UN_SECURE_VALUE) {
      // Unsecure Component
      if (isAuthenticatedUser()) {
        redirectUser(
          RouteConstants.PRODUCTS,
          redirectUrl ? redirectUrl : RouteConstants.BASE,
        );
      } else {
        if (!isEmpty(getUserDataFromCookie())) {
          redirectUser(
            RouteConstants.PRODUCTS,
            redirectUrl ? redirectUrl : RouteConstants.BASE,
          );
        } else {
          deleteToken();
          navigate(redirectUrl ? redirectUrl : RouteConstants.BASE, {
            replace: true,
          });
        }
      }
    } else if (securityParam === Constants.SECURE_VALUE) {
      // Secure Component
      redirectUser(
        redirectUrl ? redirectUrl : RouteConstants.PRODUCTS,
        RouteConstants.BASE,
      );
    } else {
      // After login step
      const token = getParamsFromUrl(location.search, Constants.COOKIE_TOKEN);
      const refreshToken = getParamsFromUrl(
        location.search,
        Constants.COOKIE_REFRESH_TOKEN,
      );
      if (!isEmpty(token) && !isEmpty(refreshToken)) {
        cookies.save(Constants.COOKIE_TOKEN, token, {
          path: RouteConstants.BASE,
          expires,
        });
        cookies.save(Constants.COOKIE_REFRESH_TOKEN, refreshToken, {
          path: RouteConstants.BASE,
          expires,
        });

        redirectUser(RouteConstants.PRODUCTS, RouteConstants.LOGIN);
      } else {
        navigate(RouteConstants.LOGIN, { replace: true });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <PageLoader title="Redirecting ..." />;
};

export default RedirectScreen;
