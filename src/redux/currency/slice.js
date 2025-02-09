import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getCurrency, getExchangeInfo } from './operations';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(getExchangeInfo.fulfilled, (state, action) => {
        state.exchangeInfo = action.payload;
      })

      .addMatcher(
        isAnyOf(getExchangeInfo.fulfilled, getCurrency.fulfilled),
        state => {
          state.isLoading = false;
        },
      )

      .addMatcher(
        isAnyOf(getExchangeInfo.pending, getCurrency.pending),
        state => {
          state.isLoading = true;
          state.error = null;
        },
      )

      .addMatcher(
        isAnyOf(getExchangeInfo.rejected, getCurrency.rejected),
        (state, action) => {
          state.exchangeInfo = null;
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const currencyReducer = currencySlice.reducer;
export const { setDefaultCurrency } = currencySlice.actions;
