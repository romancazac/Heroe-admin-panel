import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { useHttp } from "../../hooks/http.hook";
// First, create the thunk
export const fetchFilters = createAsyncThunk(
  'pizza/fetchFiltersstatus',
   () => {


    const {request} = useHttp();
    return  request("http://localhost:3001/filters")

  }
)

const initialState ={
  filters:[],
  activeFilter:"all",
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    filtersItems: (state, action) => {
      state.filters =  action.payload
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload
    }
  },
  extraReducers: {
    [fetchFilters.pending]: (state) => {
       state.status = 'loading';
       state.filters= []
    },
    [fetchFilters.fulfilled]: (state, action) => {
       
       state.filters = action.payload;
       state.status = 'succes';
    },
    [fetchFilters.rejected]: (state) => {
       state.status = 'error';
       state.filters = []
    },
 }
})

// Action creators are generated for each case reducer function
export const {  filtersItems, setActiveFilter } = filterSlice.actions

export default filterSlice.reducer