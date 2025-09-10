import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'


function App() {
  const API = "https://swapi.info/api/films"
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [isRetrying, setIsRetrying]= useState(false);

  const intervalRef = useRef(null);


  const fetchData =useCallback(async () =>{
    setIsLoading(true);
    setError(null);

    try{
      const res = await fetch(API);
      
      if(!res.ok){
        throw new Error("Something Went Wrong!!")
      }

      if(intervalRef){
        clearInterval(intervalRef);
        setIsRetrying(false);
      }
      const data = await res.json();

      const filmsdata = data.map((film) => (
        <div key={film.url}>{film.title}</div>
        ));

      setFilms(filmsdata);

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

  return (
    <>
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
        {!isLoading && films}
        {error}
      </div>
    </>
  )
}

export default App
