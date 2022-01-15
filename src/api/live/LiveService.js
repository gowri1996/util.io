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

const getExpenseCategories = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const createExpense = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const deleteExpense = (request) => {
  return new Promise((resolve, reject) => {
    resolve(request);
  });
};

const updateExpense = (request) => {
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

  getExpenseCategories,
  createExpense,
  deleteExpense,
  updateExpense,
};

export default exportData;
