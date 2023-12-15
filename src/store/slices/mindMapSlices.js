import { createSlice } from "@reduxjs/toolkit";
import { deleteMindMapMiddleware, getMindMapMiddleware, postMindMapMiddleware } from "../middlewares/mindMapmiddleware";
const initialState = {
     listMindMaps: [],
     loading: false
}

export const mindMapSlices = createSlice({
     name: "mindmaps",
     initialState,
     reducers: [
     ],
     extraReducers: (builder) => {
          const actionMiddleware = [getMindMapMiddleware, postMindMapMiddleware, deleteMindMapMiddleware];
          actionMiddleware.forEach((action) => {
               builder.addCase(action.pending, (state) => {
                    state.loading = true;

               });
               builder.addCase(action.rejected, (state) => {
                    state.loading = false;
               });
          })

          builder.addCase(getMindMapMiddleware.fulfilled, (state, action) => {
               state.listMindMaps = action.payload;
               state.loading = false;
          });
          builder.addCase(postMindMapMiddleware.fulfilled, (state, action) => {
               if (action.payload) {
                    state.listMindMaps = [...state.listMindMaps, action.payload]
               }
               state.loading = false;
          });
          builder.addCase(deleteMindMapMiddleware.fulfilled, (state, action) => {
               if (action.payload) {
                    state.listMindMaps = state.listMindMaps.filter(mindmap => mindmap.id !== action.payload);
               }
               state.loading = false;
          });
     }
})
export default mindMapSlices.reducer;
