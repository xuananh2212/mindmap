import { createSlice } from "@reduxjs/toolkit";
import { deleteAllMindMapMiddleware, deleteMindMapMiddleware, getMindMapMiddleware, postMindMapMiddleware, updateMindMapMiddleware } from "../middlewares/mindMapmiddleware";
const initialState = {
     listMindMaps: [],
     loading: false,
     idUser: ""
}

export const mindMapSlices = createSlice({
     name: "mindmaps",
     initialState,
     reducers: {
          idUser: (state, action) => {
               state.idUser = action.payload;
          }
     }
     ,
     extraReducers: (builder) => {
          const actionMiddleware = [getMindMapMiddleware, postMindMapMiddleware,
               deleteMindMapMiddleware, deleteAllMindMapMiddleware, updateMindMapMiddleware];
          actionMiddleware.forEach((action) => {
               builder.addCase(action.pending, (state) => {
                    state.loading = true;

               });
               builder.addCase(action.rejected, (state) => {
                    state.loading = false;
               });
          })

          builder.addCase(getMindMapMiddleware.fulfilled, (state, action) => {
               state.listMindMaps = action.payload.data.filter(({ idUser }) => idUser === action.payload.id);
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
          builder.addCase(deleteAllMindMapMiddleware.fulfilled, (state, action) => {
               if (action.payload) {
                    state.listMindMaps = [...state.listMindMaps.filter(({ id }) => !action.payload.includes(id))];
               }
               state.loading = false;
          });
          builder.addCase(updateMindMapMiddleware.fulfilled, (state, action) => {
               if (action.payload) {
                    state.listMindMaps = [...(state.listMindMaps.filter(({ id }) => id !== action.payload.id)), action.payload];
               }
               state.loading = false;
          });
     }
})
export default mindMapSlices.reducer;
