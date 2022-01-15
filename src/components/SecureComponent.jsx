import { Box, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import RouteConstants from '../constants/RouteConstants';
import { isAuthenticatedUser } from '../utils/AuthUtils';
import isEmpty from 'lodash.isempty';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const secureComponent = (Page) => {
  return (props) => {
    const isLoggedIn = isAuthenticatedUser();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user);

    useEffect(() => {
      console.log('Hi');
      if (
        (isEmpty(user._id) && isLoggedIn) ||
        (!isEmpty(user._id) && !isLoggedIn)
      ) {
        let route = RouteConstants.REDIRECT;
        if (location && location.pathname) {
          let searchParams = location.search
            ? '&' + location.search.slice(1)
            : '';
          route += '?redirect=' + location.pathname + searchParams;
        }
        navigate(route, { replace: true });
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isEmpty(user._id) && !isLoggedIn) return null;
    else if (isEmpty(user._id) && isLoggedIn) return null;
    else if (isEmpty(user._id) && !isLoggedIn)
      return (
        <Box>
          <Text>
            You're not logged in to the system. Try to
            <Link color='blue.500' as={RouterLink} to={RouteConstants.LOGIN}>
              {' '}
              Login
            </Link>
          </Text>
        </Box>
      );

    return <Page {...props} />;
  };
};

export default secureComponent;
