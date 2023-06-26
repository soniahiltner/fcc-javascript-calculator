
import React from 'react';
import '../stylesheets/display.css';

function Display({ input, output }){
  return (
      <div  className="display" >
        <span className='output form-control'>{output} </span>
        <span id='display' className='input form-control'>{input}</span>
      </div>
  )
};

export default Display;