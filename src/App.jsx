import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import InputForm from './component/Form/InputForm';



function App() {
  const API_BASE = "https://moviedata-9a9ab-default-rtdb.asia-southeast1.firebasedatabase.app/movies"
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [isRetrying, setIsRetrying]= useState(false);

  const intervalRef = useRef(null);

  
  async function addMovieHandler(newFilm){
        try{
            const response = await fetch(`${API_BASE}.json`, {
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
        fetchData();
  };


  const fetchData = useCallback(async () =>{
    setIsLoading(true);
    setError(null);

    try{
      const res = await fetch(`${API_BASE}.json`);
      
      if(!res.ok){
        throw new Error("Something Went Wrong!!")
      }

      if(intervalRef){
        clearInterval(intervalRef);
        setIsRetrying(false);
      }

      const data = await res.json();

      const loadedMovies=[];

      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          release:data[key].release,
          opening:data[key].opening,
        })
      }
      console.log(loadedMovies);
      
      // const filmsdata = loadedMovies.map((film) => {
      //   return {
      //     id:film.id,
      //     title:film.title,
      //     opening:film.opening,
      //     release:film.release
      //   }
      // });
      // The loadedMovies array is already in the correct shape.
      setFilms(loadedMovies);

      setIsLoading(false);
    }
    catch(err){
      console.log(err);
      setError("Something Went Wrong! ...Retrying");
      setIsLoading(false);

      if(!intervalRef.current){
        setIsRetrying(true);
        intervalRef.current = setInterval(() => {
          fetchData();
        }, 5000);
      }
    }
  },[]);

  useEffect( () => {
    fetchData();
  }, [fetchData])
  

  function cancelRetry() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRetrying(false);
    setError("Retrying cancelled by user.");
  }

  async function deleteEntryHandler(id){
    try {
      await fetch(`${API_BASE}/${id}.json`, {
        method:"DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchData(); // Re-fetch movies to update the list
    } catch (err) {
      console.error("Failed to delete movie:", err);
      setError("Failed to delete movie.");
    }
  }
  return (
    <>
      <InputForm addMovie={addMovieHandler}/>
      <button onClick={fetchData}>Fetch</button>
      <div>
          {isLoading && <span>Loading...</span>}
      </div>
      <div>
        {isRetrying && (
        <button onClick={cancelRetry} style={{ marginTop: "10px" }}>
          Cancel
        </button>
      )}
      </div>
      <div>
        {!isLoading && films.length > 0 && films.map((film) => (
          <div key={film.id}>
            {film.title}----
            {film.opening}----
            {film.release}---
            <button onClick={() => deleteEntryHandler(film.id)}>Delete</button>
          </div>
        ))}
        {!isLoading && films.length === 0 && !error && <p>No movies found.</p>}
        {error}
      </div>
    </>
  )
}

export default App
 //title open relese