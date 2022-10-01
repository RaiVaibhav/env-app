import { configureStore } from '@reduxjs/toolkit'

import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import eventReducer from './eventSlice';

// create a makeStore function
const makeStore = (context) => configureStore({
  reducer: {
    event: eventReducer
  },
})

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});