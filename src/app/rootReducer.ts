import { combineReducers } from '@reduxjs/toolkit';
import searchedTermHistory from '../features/searchHistory/searchedTermHistorySlice';
import viewedProductHistory from '../features/searchHistory/viewedProductHistorySlice';
import shoppingCartProducts from '../features/shoppingCart/shoppingCartProductsSlice';

const rootReducer = combineReducers({
  searchedTermHistory,
  viewedProductHistory,
  shoppingCartProducts
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
