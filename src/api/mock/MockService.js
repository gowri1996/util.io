import {
  isAuthenticatedUser,
  isRefreshTokenValid,
} from '../../utils/AuthUtils';

import bcrypt from 'bcryptjs';
import isEmpty from 'lodash.isempty';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const timeout = 0;

const generateHashPassword = (passwordPlainText) => {
  const hash = bcrypt.hashSync(passwordPlainText, 10);
  return hash;
};

const checkPassword = (passwordPlainText, hashedPassword) => {
  return bcrypt.compareSync(passwordPlainText, hashedPassword);
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
          expenses: [],
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
          reject({ message: 'Invalid Email / Password' });
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
          issuer: 'expense-tracker',
        });
        const refreshToken = jwt.sign(
          { email: request.email },
          'refreshToken',
          {
            expiresIn: '7d',
            issuer: 'expense-tracker',
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
          reject({ message: 'Invalid Email / Password' });
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
          reject({ message: 'Invalid Email / Password', status: 400 });
          return;
        }

        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isAuthenticatedUser()) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        const data = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          expenses: user.expenses,
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
          reject({ message: 'Invalid Email / Password' });
          return;
        }

        const user = localUsers.find(
          (localUser) => localUser.refreshToken === refreshToken
        );
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials' });
          return;
        }

        if (!isRefreshTokenValid()) {
          reject({ message: 'Token Expired' });
          return;
        }

        const newToken = jwt.sign({ email: user.email }, 'token', {
          expiresIn: '24h',
          issuer: 'expense-tracker',
        });
        const newRefreshToken = jwt.sign(
          { email: user.email },
          'refreshToken',
          {
            expiresIn: '7d',
            issuer: 'expense-tracker',
          }
        );

        // store new token and refreshToken
        user.token = newToken;
        user.refreshToken = newRefreshToken;

        localStorage.setItem('users', JSON.stringify(localUsers));
        resolve({
          status: 200,
          message: 'Logged in successfully',
          data: { token: newToken, refreshToken: newRefreshToken },
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

const getExpenseCategories = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve([
        { _id: 'food', name: 'Food' },
        { _id: 'party', name: 'Party' },
        { _id: 'college', name: 'College' },
      ]);
    } catch (err) {
      reject(err);
    }
  });
};

const createExpense = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid Email / Password', status: 400 });
          return;
        }

        const token = request.token;
        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isAuthenticatedUser()) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        const currentTime = new Date();
        const expense = {
          ...request.expense,
          _id: uuidv4(),
          createdAt: currentTime.toString(),
          updatedAt: currentTime.toString(),
        };
        user.expenses = [...user.expenses, expense];
        localStorage.setItem('users', JSON.stringify(localUsers));

        resolve({
          status: 200,
          message: 'Expense created successfully',
          data: expense,
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const deleteExpense = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid Email / Password', status: 400 });
          return;
        }

        const token = request.token;
        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isAuthenticatedUser()) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        const expense = user.expenses.find(
          (expense) => expense._id === request.expenseId
        );
        if (expense)
          user.expenses.splice(
            user.expenses.findIndex(
              (expense) => expense._id === request.expenseId
            ),
            1
          );
        localStorage.setItem('users', JSON.stringify(localUsers));

        resolve({
          status: 200,
          message: 'Expense deleted successfully',
          data: expense,
        });
      } catch (err) {
        reject(err);
      }
    }, timeout);
  });
};

const updateExpense = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let localUsers = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(localUsers)) {
          reject({ message: 'Invalid Email / Password', status: 400 });
          return;
        }

        const token = request.token;
        const user = localUsers.find((localUser) => localUser.token === token);
        if (isEmpty(user)) {
          reject({ message: 'Invalid credentials', status: 400 });
          return;
        }

        if (!isAuthenticatedUser()) {
          reject({ message: 'Token Expired', status: 401 });
          return;
        }

        const expense = user.expenses.find(
          (expense) => expense._id === request.expenseId
        );
        if (expense)
          Object.assign(expense, expense, request.expense, {
            updatedAt: new Date().toString(),
          });
        localStorage.setItem('users', JSON.stringify(localUsers));

        resolve({
          status: 200,
          message: 'Expense updated successfully',
          data: expense,
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

  getExpenseCategories,
  createExpense,
  deleteExpense,
  updateExpense,
};

export default exportData;
