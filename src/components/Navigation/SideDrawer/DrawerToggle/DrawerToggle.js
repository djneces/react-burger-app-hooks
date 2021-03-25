import React from 'react';
import classes from './DrawerToggle.css';

//clicked handled: DrawerToggle -> Toolbar -> Layout -> sideDrawerToggleHandler func changing the state
const drawerToggle = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
export default drawerToggle;
