import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { resetTransaction } from "./transactionSlice";
import Service from "../../api/Service";

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.logoutUser(user.token);
      dispatch(resetTransaction());
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const login = createAsyncThunk(
  "user/login",
  async (request, { rejectWithValue }) => {
    try {
      const response = await Service.loginUserService(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  "user/register",
  async (request, { rejectWithValue }) => {
    try {
      const response = await Service.registerUserService(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "user/forgot-password",
  async (request, { rejectWithValue }) => {
    try {
      const response = await Service.resetPasswordUserService(request);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (request, { getState, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.updateUser({
        token: user.token,
        user: request,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUserFromToken = createAsyncThunk(
  "user/details",
  async (token, { rejectWithValue }) => {
    try {
      const response = await Service.getUserFullDetails(token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const refreshTokens = createAsyncThunk(
  "user/refresh-tokens",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await Service.refreshTokens(refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const getInitialState = () => {
  return {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
    token: null,
    refreshToken: null,
    createdAt: null,
    updatedAt: null,
    currency: null,
  };
};

const resetUser = () => {
  return getInitialState();
};

const setUser = (state, action) => {
  return action.payload.data;
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logout.fulfilled, resetUser)
      .addCase(updateUser.fulfilled, setUser)
      .addCase(getUserFromToken.fulfilled, setUser)
      .addCase(refreshTokens.fulfilled, setUser);
  },
});

export const getUser = (state) => state.user;

export default userSlice.reducer;
