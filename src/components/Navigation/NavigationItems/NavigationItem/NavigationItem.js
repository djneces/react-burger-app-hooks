import React from 'react';
import classes from './NavigationItem.css';
// NavLink is styled, links without page refresh
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    {/* navlink adds class active  */}
    <NavLink
      to={props.link}
      //exact so active class applies perfectly
      exact={props.exact}
      //need to link our CSS class active here, otherwise not apply (system (classes) generates random class names)
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
