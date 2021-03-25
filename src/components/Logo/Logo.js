import React from 'react';
// import img for webpack
import burgerLogo from '../../assets/images/28.1 burger-logo.png.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt='MyBurger' />
  </div>
);

export default logo;
