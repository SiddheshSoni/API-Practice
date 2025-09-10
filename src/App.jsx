import { useState } from 'react'

import './App.css'


function App() {
  const API = "https://swapi.info/api/films"
  const [films, setFilms] = useState([])
  
  async function fetchData(){
    try{
      const res = await fetch(API);
      const data = await res.json();
      console.log(data);
      setFilms(data);
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <button onClick={fetchData}>Fetch</button>
      <div>
        {films.map((film) => (
          <div key={film.url}>{film.title}</div>
        ))}
      </div>
    </>
  )
}

export default App
