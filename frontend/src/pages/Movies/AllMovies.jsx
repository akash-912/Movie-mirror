import { useGetAllMoviesQuery } from "../../redux/api/movies.js"
import { useFetchGenresQuery } from "../../redux/api/genre.js"
import {
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
}   from "../../redux/api/movies.js";

import MoviesCard from "./MoviesCard.jsx";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg"
import {
    setMoviesFilter,
    setFilteredMovies,
    setMovieYears,
    setUniqueYears,
}   from "../../redux/feature/movies/moviesSlice";


const AllMovies = () => {
    const dispatch = useDispatch();
    const {data} = useGetAllMoviesQuery();
    const { data: genres } = useFetchGenresQuery();
    const { data: newMovies } = useGetNewMoviesQuery();
    const { data: topMovies } = useGetTopMoviesQuery();
    const { data: randomMovies } = useGetRandomMoviesQuery();

    const { moviesFilter, filteredMovies} = useSelector((state) => state.movies);

    const movieYears = data?.map((movie) =>movie.year);
    const uniqueYears = Array.from(new Set(movieYears));

    useEffect(()=> {
        dispatch(setFilteredMovies(data|| []));
        dispatch(setMovieYears(movieYears));
        dispatch(setUniqueYears(uniqueYears));

    }, [data,dispatch]);

    const handleSearchChange = (e) =>{
        dispatch(setMoviesFilter({ searchTerm: e.target.value}));

        const filteredMovies = data.filter((movie)=>{
            movie.name.toLowerCase().includes(e.target.value.toLowerCase());

        });
        dispatch(setFilteredMovies(filteredMovies));
    };

    

  return (
    <div>AllMovies</div>
  )
}

export default AllMovies