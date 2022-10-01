import { createSlice } from '@reduxjs/toolkit'
import { enableMapSet } from 'immer';
enableMapSet();

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    value: new Map(),
  },
  reducers: {
    createEvent: (state, action) => {
      state.value.set(String(action.payload.id), action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { createEvent } = eventSlice.actions

export default eventSlice.reducer