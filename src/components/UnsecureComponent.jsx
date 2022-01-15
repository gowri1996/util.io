import RouteConstants from '../constants/RouteConstants';
import { isAuthenticatedUser } from '../utils/AuthUtils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const unsecureComponent = (Page) => {
  return (props) => {
    const navigate = useNavigate();
    const isAuthenticated = isAuthenticatedUser();

    useEffect(() => {
      if (isAuthenticated) {
        navigate(RouteConstants.REDIRECT, { replace: true });
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isAuthenticated) return null;
    return <Page {...props} />;
  };
};

export default unsecureComponent;
