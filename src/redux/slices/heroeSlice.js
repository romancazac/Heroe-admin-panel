import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { useHttp } from "../../hooks/http.hook";
// First, create the thunk
export const fetchHeroes = createAsyncThunk(
  'pizza/fetchHeroestatus',
  () => {

    // const { data } = await axios.get(`https://625406a519bc53e234775c39.mockapi.io/eclean?${category}${page}${sort}`)
    const { request } = useHttp();
    return request("http://localhost:3001/heroes")

  }
)
const initialState = {
  heroes: [],

}

export const heroeSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {

    heroesItems: (state, action) => {
      state.heroes = action.payload
    },
    addHeroe: (state, action) => {
      const newHeroe = [...state.heroes, action.payload]
      state.heroes = newHeroe;

    },
    removeHeroe: (state, action) => {
      const heroeRemove = state.heroes.filter((obj) => obj.id !== action.payload);
      state.heroes = heroeRemove
    },

  },
  extraReducers: {
    [fetchHeroes.pending]: (state) => {
      state.status = 'loading';
      state.heroes = []
    },
    [fetchHeroes.fulfilled]: (state, action) => {

      state.heroes = action.payload;
      state.status = 'succes';
    },
    [fetchHeroes.rejected]: (state) => {
      state.status = 'error';
      state.heroes = []
    },
  }
})

// Action creators are generated for each case reducer function
export const { heroesItems, addHeroe, removeHeroe, filterHeroe } = heroeSlice.actions

export default heroeSlice.reducer