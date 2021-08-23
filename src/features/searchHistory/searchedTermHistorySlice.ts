import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, AppDispatch } from '../../app/store';
import { loadState } from '../../localStorage';
import { SearchedTermHistory } from '../../types/SearchedTermHistory';

let initialState: SearchedTermHistory[] = [];

if (loadState() && loadState().searchedTermHistory) {
  initialState = loadState().searchedTermHistory;
}
const searchTermHistorySlice = createSlice({
  name: 'searchTermHistory',
  initialState,
  reducers: {
    addSearchedTerm(state, action: PayloadAction<SearchedTermHistory>) {
      state.push(action.payload);
    },
  },
});

export const addSearchedTerm =
  (searchTerm: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    const newSerch: SearchedTermHistory = {
      id: Math.random().toString(36).substr(2, 9),
      searchTerm,
      // date: new Date()
    };

    dispatch(searchTermHistorySlice.actions.addSearchedTerm(newSerch));
  };

export default searchTermHistorySlice.reducer;
