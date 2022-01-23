import { Box, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import Constants from '../constants/Constants';
import RouteConstants from '../constants/RouteConstants';
import cookies from 'react-cookies';
import { getUser } from '../app/slices/userSlice';
import { isAuthenticatedUser } from '../utils/AuthUtils';
import isEmpty from 'lodash.isempty';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const secureComponent = (Page) => {
  return (props) => {
    const user = useSelector(getUser);
    const token = cookies.load(Constants.COOKIE_TOKEN);
    const isTokenValid = isAuthenticatedUser();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isEmpty(token) && (isEmpty(user._id) || !isTokenValid)) {
        let route = `${RouteConstants.REDIRECT}?${Constants.SECURE_KEYWORD}=${Constants.SECURE_VALUE}`; // construct secure component value
        route += `&${Constants.REDIRECT_KEYWORD}=${location.pathname}`; // construct redirect pathname
        route += location.search ? '&' + location.search.slice(1) : ''; // add query params to url. slice to remove '?' character
        navigate(route, { replace: true });
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isEmpty(token))
      return (
        <Box>
          <Text>
            You're not logged in to the system. Try to
            <Link as={RouterLink} to={RouteConstants.LOGIN}>
              {' Login'}
            </Link>
          </Text>
        </Box>
      );

    if (user._id && isTokenValid) return <Page {...props} />;

    return null;
  };
};

export default secureComponent;
