import React from 'react'

const Input = (props) => {
  return (
    <div>
        <label htmlFor={props.name}>{props.name}</label><br/>
        <input id={props.name} />
    </div>
  )
}

export default Input