import React from 'react';
import classes from './Button.css';

const button = (props) => (
  <button
    disabled={props.disabled}
    //btn style success, danger => dynamic
    className={[classes.Button, classes[props.btnType]].join(' ')} //back to string
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
