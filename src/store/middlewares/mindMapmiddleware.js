import { createAsyncThunk } from '@reduxjs/toolkit';
const api = "https://gsv9fx-8080.csb.app/mindmap";
export const getMindMapMiddleware = createAsyncThunk("mindmap/getMindMapMiddleware", async (id) => {
     const response = await fetch(`${api}`);
     const data = await response.json();
     return { data, id };
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
     }
     return null;

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
     }
     return null;

})

export const deleteAllMindMapMiddleware = createAsyncThunk("mindmap/deleteAllMindMapMiddleware", async (mindmaps) => {
     const headers = {
          'Content-Type': 'application/json'
     }

     let delArray = mindmaps?.map(({ id }) => id)
     let delFetch = delArray.map(eleid => {
          return fetch(`${api}/${eleid}`, {
               method: 'DELETE',
               headers: headers,
          });
     });
     try {
          const res = await Promise.all([delFetch]);
          return delArray;
     } catch (e) {
          return null;
     }
})

export const updateMindMapMiddleware = createAsyncThunk("mindmap/updateMindMapMiddleware", async (data) => {
     const response = await fetch(`${api}/${data.id}`, {
          method: 'PUT',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     });
     if (response.ok) {
          return data;
     }
     return null;
})