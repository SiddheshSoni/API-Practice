import React from "react";

const MovieContext = React.createContext({
    films:[],
    addMovie:()=>{},
});

export default MovieContext;