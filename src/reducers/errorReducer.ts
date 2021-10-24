import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HttpException } from '../interfaces/extapi/error';

export const initialState: HttpException = {
  statusCode: 0,
  message: ''
}

const errSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    getError: (state, action: PayloadAction<HttpException>) => {
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
    }
  }
})

export const { getError } = errSlice.actions;
export default errSlice.reducer;