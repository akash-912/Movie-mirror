import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        moviesFilter: {
            searchTerm: "",
            selectedGenre: "",
            selectedYear: "",
            selectedSort: [],
        },
        filteredMovies: [],
        moviesYear: [],
        uniqueYear: [],
    },

    reducers: {
        setMoviesFilter: (state, action) =>{
            state.moviesFilter = { ...state.moviesFilter, ...action.payload};
        },
        setFilteredMovies: (state, action) =>{
            state.filteredMovies = action.payload;
        },
        setMovieYears: (state,action) =>{
            state.moviesYear = action.payload;
        },
        setUniqueYears: (state, action) =>{
            state.uniqueYear = action.payload;
        },
    },
});


export const {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} = moviesSlice.actions;

export default moviesSlice.reducer;