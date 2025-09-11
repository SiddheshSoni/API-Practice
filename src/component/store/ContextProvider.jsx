import React, { useState } from "react";
import MovieContext from "./MovieContext";

const ContextProvider = (props)=>{
    const [films, setFilms] = useState([]);

    const inputData = {
        films:films,
        addMovie:addMovieHandler,
    };

    function addMovieHandler(newFilm){
        setFilms([...films, newFilm]);
    };

    return(
        <MovieContext.Provider value={inputData}>{props.children}</MovieContext.Provider>
    )
}

export default ContextProvider;