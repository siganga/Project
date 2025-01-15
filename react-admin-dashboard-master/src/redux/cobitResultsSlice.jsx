import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Initialize with an empty object or a default state
  cobitResults: {}, 
};

export const cobitResultsSlice = createSlice({
  name: 'cobitResult',
  initialState,
  reducers: {
    
    setResults: (state, action) => {
              state.cobitResults = action.payload;
    },
  },
});

export const {setResults } = cobitResultsSlice.actions;

export default cobitResultsSlice.reducer;