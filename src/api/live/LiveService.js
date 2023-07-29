/* eslint-disable no-unused-vars*/

const registerUserService = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const loginUserService = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const resetPasswordUserService = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const updateUser = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const getUserFullDetails = (token) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const refreshTokens = (refreshToken) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const logoutUser = (token) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const createTransaction = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const deleteTransaction = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const updateTransaction = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const fetchTransactions = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const exportData = {
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
