import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Service from "../../api/Service";

export const deleteTransaction = createAsyncThunk(
  "transaction/delete",
  async (transactionId, { getState, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.deleteTransaction({
        transactionId,
        token: user.token,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createTransaction = createAsyncThunk(
  "transaction/create",
  async (transaction, { getState, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.createTransaction({
        transaction,
        token: user.token,
      });
      //response.data.userId = user._id; // addinjg userId to each transaction for mapping, if needed
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateTransaction = createAsyncThunk(
  "transaction/update",
  async (request, { getState, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.updateTransaction({
        ...request,
        token: user.token,
      });
      //response.data.userId = user._id; // addinjg userId to each transaction for mapping, if needed
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchTransactions = createAsyncThunk(
  "transaction/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const user = getState().user;
      const response = await Service.fetchTransactions(user._id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (_, { getState }) => {
      const transaction = getState().transaction;
      if (transaction.fetched) return false;
    },
  },
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    fetched: false,
    transactions: [],
  },
  reducers: {
    resetTransaction: (state) => {
      state.fetched = false;
      state.transactions = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions.splice(
          state.transactions.findIndex(
            (transaction) => transaction._id === action.payload.data._id,
          ),
          1,
        );
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload.data);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const data = action.payload.data;
        const transaction = state.transactions.find(
          (transaction) => transaction._id === data._id,
        );
        Object.entries(data).forEach(([key, value]) => {
          transaction[key] = value;
        });
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        const transactions = action.payload.data;
        state.fetched = true;
        state.transactions.splice(
          0,
          state.transactions.length,
          ...transactions,
        );
      });
  },
});

export const { resetTransaction } = transactionSlice.actions;

export const isTransactionFetched = (state) => state.transaction.fetched;
export const getAllTransactions = (state) => state.transaction.transactions;

export default transactionSlice.reducer;
