import React from 'react'
import Input from './Input';


const InputForm = (props) => {
    

    function FormHandler(e){
        e.preventDefault();
        const inputData={
            title: e.target.title.value,
            opening: e.target.opening.value,
            release : e.target.release.value,
        }
        console.log(inputData);
        props.addMovie(inputData);
        e.target.reset();
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