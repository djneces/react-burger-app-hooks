import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  // => Modal is not updating if we adding ingredients, orderSummary is not updating either
  //updates first when we click order and modal appears, => Modal and orderSummary update
  //OrderSummary is within Modal in BurgerBuilder

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   ); //children -> it affects orderSummary, to show a spinner
  // }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

//React.memo optimizes performance and update when props change
//plus comparison function as second argument
//change equality
export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
