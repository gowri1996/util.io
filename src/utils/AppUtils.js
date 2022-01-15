import RouteConstants from '../constants/RouteConstants';

const successToastMessage = (data) => {
  return { position: 'top-right', status: 'success', duration: 2000, ...data };
};

const errorToastMessage = (data) => {
  return { position: 'top-right', status: 'error', duration: 2000, ...data };
};

const getNavLinks = () => {
  return [
    {
      ROUTE: RouteConstants.OVERVIEW,
      TEXT: 'Overview',
      SHORT_TEXT: 'O',
    },
    {
      ROUTE: RouteConstants.ANALYTICS,
      TEXT: 'Analytics',
      SHORT_TEXT: 'A',
    },
  ];
};

const exportData = {
  successToastMessage,
  errorToastMessage,
  getNavLinks,
};

export default exportData;
