import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store';
import { loadState } from '../../localStorage';
import { ViewedProductHistory } from '../../types/ViewedProductHistory';

let initialState: ViewedProductHistory[] = [];

if (loadState() && loadState().viewedProductHistory) {
  initialState = loadState().viewedProductHistory;
}

const viewedProductHistorySlice = createSlice({
  name: 'viewedProductHistory',
  initialState,
  reducers: {
    addViewedProduct(state, action: PayloadAction<ViewedProductHistory>) {
      if (state.find(product => product.productId === action.payload.productId)) {
        // zmiana daty
      } else {
          state.push(action.payload);
      }
      console.log(  )
    },
  },
});

export const addViewedProduct =
  (productId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const newViewedProduct: ViewedProductHistory = {
      productId,
      date: (new Date()).toString()
    };

    dispatch(
      viewedProductHistorySlice.actions.addViewedProduct(newViewedProduct)
    );
  };

export default viewedProductHistorySlice.reducer;
