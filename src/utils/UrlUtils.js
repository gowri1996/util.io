import isEmpty from 'lodash.isempty';

const addQueryParamsToUrl = (route, params) => {
  if (isEmpty(params)) return route;
  Object.keys(params).forEach((key, index) => {
    if (index === 0) route += '?';
    else route += '&';
    route += key + '=' + encodeURIComponent(params[key]);
  });
  return route;
};

const getParamsFromUrl = (urlSearchParams, param) => {
  return new URLSearchParams(urlSearchParams).get(param);
};

const getAllParamsAsStringFromUrl = (urlSearchParams, omitList) => {
  const entries = new URLSearchParams(urlSearchParams).entries();
  let result = '';
  let index = 0;
  for (var entry of entries) {
    if (omitList.includes(entry[0])) continue;
    if (index === 0) result += '?';
    else result += '&';
    result += entry[0] + '=' + entry[1];
    index = index + 1;
  }
  return result;
};

export { addQueryParamsToUrl, getParamsFromUrl, getAllParamsAsStringFromUrl };
