import { configureStore } from "@reduxjs/toolkit";
import mindMapReducer from './slices/mindMapSlices';
export const store = configureStore({
     reducer: {
          mindMap: mindMapReducer
     }
})