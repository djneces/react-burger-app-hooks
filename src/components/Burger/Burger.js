import React from 'react';
//to access special props like history, match etc. (Checkout, BurgerBuilder is loaded via Route, they have only access, not it's childs) ->we need withRouter
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './Burgeringredient/Burgeringredient';

const burger = (props) => {
  // ingredients in the states is an object => convert into array
  let transformedIngredients = Object.keys(props.ingredients) // keys => salad, bacon, cheese ...
    .map((igKey) => {
      // props.ingredients[igKey] = quantity, [...Array(2)] === [undefined], [undefined]
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />; //key => salad1 etc
      });
    }) //without reduce: [Array(2), Array(0), Array(0), Array(0)]
    .reduce((acc, el) => {
      //we cant use arr.length, its always 4, reduce helps to flatten the arr: (2) [{…}, {…}], we can use length now
      return acc.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

//we wrap it here
export default withRouter(burger);
