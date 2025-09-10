import { useState } from 'react'

import './App.css'


function App() {
  const API = "https://swapi.info/api/films"
  const [films, setFilms] = useState([])
  const [isLoading, SetIsLoading] = useState(false);


  async function fetchData(){
    SetIsLoading(true);
    console.log(isLoading)
    
    try{
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);
      setFilms(data);
      SetIsLoading(false);
      console.log(isLoading)
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <button onClick={fetchData}>Fetch</button>
      <div>
          {isLoading && <span>Loading...</span>}
      </div>
      <div>
        {console.log(isLoading)}
        {films.map((film) => (
          <div key={film.url}>{film.title}</div>
        ))}
      </div>
    </>
  )
}

export default App
