import { createAsyncThunk } from '@reduxjs/toolkit';
const api = "http://localhost:3005/mindmap";
export const getMindMapMiddleware = createAsyncThunk("mindmap/getMindMapMiddleware", async () => {
     const response = await fetch(`${api}`);
     const data = await response.json();
     return data;
})
export const postMindMapMiddleware = createAsyncThunk("mindmap/postMindMapMiddleware", async (data) => {
     const response = await fetch(`${api}`, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     });
     if (response.ok) {
          return data;
     } else {
          return null;
     }
})

export const deleteMindMapMiddleware = createAsyncThunk("mindmap/deleteMindMapMiddleware", async (id) => {
     const response = await fetch(`${api}/${id}`, {
          method: 'DELETE',
          headers: {
               'Content-Type': 'application/json'
          },
     });
     if (response.ok) {
          return id;
     } else {
          return null;
     }
})