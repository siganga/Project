import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Initialize with an empty object or a default state
  questResults: {}, 
};

export const questResultsSlice = createSlice({
  name: 'questResult',
  initialState,
  reducers: {
    
    setResults: (state, action) => {
              state.questResults = action.payload;
    },
  },
});

export const {setResults } = questResultsSlice.actions;

export default questResultsSlice.reducer;