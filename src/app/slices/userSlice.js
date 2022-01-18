import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Service from '../../api/Service';

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.logoutUser(user.token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (request, { rejectWithValue }) => {
    try {
      const response = await Service.loginUserService(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (request, { rejectWithValue }) => {
    try {
      const response = await Service.registerUserService(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgot-password',
  async (request, { rejectWithValue }) => {
    try {
      const response = await Service.resetPasswordUserService(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserFromToken = createAsyncThunk(
  'user/details',
  async (token, { rejectWithValue }) => {
    try {
      const response = await Service.getUserFullDetails(token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const refreshTokens = createAsyncThunk(
  'user/refresh-tokens',
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await Service.refreshTokens(refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'user/delete-expense',
  async (expenseId, { getState, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.deleteExpense({
        expenseId,
        token: user.token,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createExpense = createAsyncThunk(
  'user/create-expense',
  async (expense, { getState, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.createExpense({
        expense,
        token: user.token,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateExpense = createAsyncThunk(
  'user/update-expense',
  async (request, { getState, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.updateExpense({
        ...request,
        token: user.token,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const resetUser = () => {
  return {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
    expenses: [],
    token: null,
    refreshToken: null,
  };
};

const setUser = (state, action) => {
  return action.payload.data;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    _id: null,
    firstName: null,
    lastName: null,
    expenses: [],
    email: null,
    token: null,
    refreshToken: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logout.fulfilled, resetUser)
      .addCase(getUserFromToken.fulfilled, setUser)
      .addCase(refreshTokens.fulfilled, setUser)
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses.splice(
          state.expenses.findIndex(
            (expense) => expense._id === action.payload.data._id
          ),
          1
        );
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload.data);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const response = action.payload;
        const expense = state.expenses.find(
          (expense) => expense._id === response.data._id
        );
        if (expense) {
          expense.name = response.data.name;
          expense.expense = response.data.expense;
          expense.category = response.data.category;
          expense.description = response.data.description;
          expense.createdAt = response.data.createdAt;
          expense.updatedAt = response.data.updatedAt;
        }
      });
  },
});

export default userSlice.reducer;
