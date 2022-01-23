import { useLocation, useNavigate } from 'react-router-dom';

import Constants from '../constants/Constants';
import RouteConstants from '../constants/RouteConstants';
import cookies from 'react-cookies';
import isEmpty from 'lodash.isempty';
import { useEffect } from 'react';

const unsecureComponent = (Page) => {
  return (props) => {
    const token = cookies.load(Constants.COOKIE_TOKEN);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (!isEmpty(token)) {
        let route = `${RouteConstants.REDIRECT}?${Constants.SECURE_KEYWORD}=${Constants.UN_SECURE_VALUE}`; // construct unsecure component value
        route += `&${Constants.REDIRECT_KEYWORD}=${location.pathname}`; // construct redirect pathname
        route += location.search ? '&' + location.search.slice(1) : ''; // add query params to url. slice to remove '?' character
        navigate(route, { replace: true });
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isEmpty(token)) return null;
    return <Page {...props} />;
  };
};

export default unsecureComponent;
