import bcrypt from 'bcryptjs';
import isEmpty from 'lodash.isempty';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const timeout = 1000;

const generateHashPassword = (passwordPlainText) => {
  const hash = bcrypt.hashSync(passwordPlainText, 10);
  return hash;
};

const checkPassword = (passwordPlainText, hashedPassword) => {
  return bcrypt.compareSync(passwordPlainText, hashedPassword);
};

const isTokenValid = (token) => {
  try {
    if (isEmpty(token)) return false;

    const decoded = jwt.decode(token);
    var currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
};

const registerUserService = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          localUsers = [];
          localStorage.setItem('users', JSON.stringify(localUsers));
        }

        if (localUsers.find((localUser) => localUser.email === request.email)) {
          reject({ message: 'Email address is already registered' });
          return;
        }

        const user = {
          ...request,
          _id: uuidv4(),
          transactions: [],
          token: null,
          refreshToken: null,
        };
        user.password = generateHashPassword(request.password);

        localUsers.push(user);
        localStorage.setItem('users', JSON.stringify(localUsers));
        resolve({
          status: 200,
          message: 'User registered successfully',
          data: {},
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const loginUserService = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid. Try again later' });
          return;
        }
        const user = localUsers.find(
          (localUser) => localUser.email === request.email
        );
        if (isEmpty(user) || !checkPassword(request.password, user.password)) {
          reject({ message: 'Invalid Email / Password' });
          return;
        }

        const token = jwt.sign({ email: request.email }, 'token', {
          expiresIn: '24h',
          issuer: 'util.io',
        });
        const refreshToken = jwt.sign(
          { email: request.email },
          'refreshToken',
          {
            expiresIn: '7d',
            issuer: 'util.io',
          }
        );

        // store new token and refreshToken
        user.token = token;
        user.refreshToken = refreshToken;

        localStorage.setItem('users', JSON.stringify(localUsers));
        resolve({
          status: 200,
          message: 'Logged in successfully',
          data: { token, refreshToken },
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const resetPasswordUserService = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid. Try again later' });
          return;
        }
        const user = localUsers.find(
          (localUser) => localUser.email === request.email
        );
        if (isEmpty(user)) {
          reject({ message: 'Email address is not registered' });
          return;
        }

        // change to new password
        user.password = generateHashPassword(request.password);

        localStorage.setItem('users', JSON.stringify(localUsers));
        resolve({
          status: 200,
          message: 'Password reset successfully',
          data: {},
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const getUserFullDetails = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid. Try again later', status: 400 });
          return;
        }

        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isTokenValid(token)) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        const data = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: user.token,
          refreshToken: user.refreshToken,
        };

        resolve({
          status: 200,
          message: 'Password reset successfully',
          data,
        });
      } catch (err) {
        reject({ ...err, status: 400 });
      }
    }, timeout);
  });
};

const refreshTokens = (refreshToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid. Try again later' });
          return;
        }

        const user = localUsers.find(
          (localUser) => localUser.refreshToken === refreshToken
        );
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials' });
          return;
        }

        if (!isTokenValid(refreshToken)) {
          reject({ message: 'Token Expired' });
          return;
        }

        const newToken = jwt.sign({ email: user.email }, 'token', {
          expiresIn: '24h',
          issuer: 'util.io',
        });
        const newRefreshToken = jwt.sign(
          { email: user.email },
          'refreshToken',
          {
            expiresIn: '7d',
            issuer: 'util.io',
          }
        );

        // store new token and refreshToken
        user.token = newToken;
        user.refreshToken = newRefreshToken;

        localStorage.setItem('users', JSON.stringify(localUsers));
        const data = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: user.token,
          refreshToken: user.refreshToken,
        };
        resolve({
          status: 200,
          message: 'Logged in successfully',
          data,
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const logoutUser = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));

        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        user.token = null;
        user.refreshToken = null;

        localStorage.setItem('users', JSON.stringify(localUsers));
        resolve({
          status: 200,
          message: 'Logged out successfully',
          data: {},
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const createTransaction = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid. Try again later', status: 400 });
          return;
        }

        const token = request.token;
        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isTokenValid(token)) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        const currentTime = new Date();
        const transaction = {
          ...request.transaction,
          _id: uuidv4(),
          createdAt: currentTime.toString(),
          updatedAt: currentTime.toString(),
        };
        user.transactions = [...user.transactions, transaction];
        localStorage.setItem('users', JSON.stringify(localUsers));

        resolve({
          status: 200,
          message: 'Transaction created successfully',
          data: transaction,
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const deleteTransaction = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid. Try again later', status: 400 });
          return;
        }

        const token = request.token;
        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isTokenValid(token)) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        const transaction = user.transactions.find(
          (transaction) => transaction._id === request.transactionId
        );
        if (transaction) {
          user.transactions.splice(
            user.transactions.findIndex(
              (transaction) => transaction._id === request.transactionId
            ),
            1
          );
        } else {
          reject({ message: 'Transaction not available', status: 400 });
          return;
        }

        localStorage.setItem('users', JSON.stringify(localUsers));

        resolve({
          status: 200,
          message: 'Transaction deleted successfully',
          data: transaction,
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const updateTransaction = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid. Try again later', status: 400 });
          return;
        }

        const token = request.token;
        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isTokenValid(token)) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        const transaction = user.transactions.find(
          (transaction) => transaction._id === request.transactionId
        );
        if (transaction) {
          Object.assign(transaction, transaction, request.transaction, {
            updatedAt: new Date().toString(),
          });
        } else {
          reject({ message: 'Transaction not available', status: 400 });
          return;
        }

        localStorage.setItem('users', JSON.stringify(localUsers));

        resolve({
          status: 200,
          message: 'Transaction updated successfully',
          data: transaction,
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const fetchTransactions = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const userId = request;
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid. Try again later', status: 400 });
          return;
        }

        const user = localUsers.find((localUser) => localUser._id === userId);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isTokenValid(user.token)) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        resolve({
          status: 200,
          message: 'Transaction fetched successfully',
          data: user.transactions,
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const exportData = {
  registerUserService,
  loginUserService,
  resetPasswordUserService,
  getUserFullDetails,
  refreshTokens,
  logoutUser,

  createTransaction,
  deleteTransaction,
  updateTransaction,
  fetchTransactions,
};

export default exportData;
