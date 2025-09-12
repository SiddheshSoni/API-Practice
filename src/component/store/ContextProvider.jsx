import React, { useState } from "react";
import MovieContext from "./MovieContext";

const ContextProvider = (props)=>{
    const [films, setFilms] = useState([]);
    const API = "https://moviedata-9a9ab-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json";

    const inputData = {
        films:films,
        addMovie:addMovieHandler,
    };

    async function addMovieHandler(newFilm){

        try{

            const response = await fetch(API, {
                method:'POST',
                body:JSON.stringify(newFilm),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    };

    return(
        <MovieContext.Provider value={inputData}>{props.children}</MovieContext.Provider>
    )
}

export default ContextProvider;