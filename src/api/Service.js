import LiveService from './live/LiveService';
import MockService from './mock/MockService';

const service =
  process.env.REACT_APP_USE_LIVE_SERVICE === 'true' ? LiveService : MockService;

const constructSuccessResponse = (result) => {
  return result;
};

const constructErrorResponse = (error) => {
  return error;
};

const registerUserService = (request) => {
  return service.registerUserService(request);
};

const loginUserService = (request) => {
  return service.loginUserService(request);
};

const resetPasswordUserService = (request) => {
  return service.resetPasswordUserService(request);
};

const updateUser = (request) => {
  return service.updateUser(request);
};

const getUserFullDetails = (token) => {
  return service.getUserFullDetails(token);
};

const refreshTokens = (refreshToken) => {
  return service.refreshTokens(refreshToken);
};

const logoutUser = (token) => {
  return service.logoutUser(token);
};

const createTransaction = (request) => {
  return service.createTransaction(request);
};

const deleteTransaction = (request) => {
  return service.deleteTransaction(request);
};

const updateTransaction = (request) => {
  return service.updateTransaction(request);
};

const fetchTransactions = (request) => {
  return service.fetchTransactions(request);
};

const exportData = {
  constructErrorResponse,
  constructSuccessResponse,
  registerUserService,
  loginUserService,
  resetPasswordUserService,
  getUserFullDetails,
  refreshTokens,
  logoutUser,
  updateUser,

  createTransaction,
  deleteTransaction,
  updateTransaction,
  fetchTransactions,
};

export default exportData;
