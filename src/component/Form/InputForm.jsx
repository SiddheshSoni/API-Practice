import React, { useContext } from 'react'
import Input from './Input';
import MovieContext from '../store/MovieContext';

const InputForm = () => {
    const movieCtxt = useContext(MovieContext);

    function FormHandler(e){
        e.preventDefault();
        const inputData={
            title: e.target.title.value,
            opening: e.target.opening.value,
            release : e.target.release.value,
        }
        console.log(inputData);
        movieCtxt.addMovie(inputData);
    }
    return <>
        <form onSubmit={FormHandler}>
            <Input name={"title"} />
            <Input name={"opening"} />
            <Input name={"release"} />
            <button type='submit'>Submit</button>
        </form>
    </>
}

export default InputForm;