import React from 'react';
import '../stylesheets/button.css';

function Button(props) {
    return (
        <button className="button" id={props.id} onClick={() => props.handleClick(props.children)}>
            {props.children}
        </button>
    )
};
export default Button;