import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Thunk pour récupérer une citation aléatoire 
export const fetchRandomQuote = createAsyncThunk(
  'quotes/fetchRandomQuote',
  async () => {
    const response = await fetch('https://dummyjson.com/quotes/random'); 
    const data = await response.json();
    return data; //INFO
  }
);

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default quotesSlice.reducer;