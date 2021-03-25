import React, { useState, useEffect, useCallback } from 'react';
//hooks to get the data from Redux store and dispatch actions
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export const burgerBuilder = (props) => {
  //constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }

  const [purchasing, setPurchasing] = useState(false);
  //down there we can remove mapStateToProps and mapDispatchToProps and connect func

  const dispatch = useDispatch();
  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  //and we can remove props in front of them down below
  const onIngredientAdded = (ingName) =>
    dispatch(actions.addIngredient(ingName));

  const onIngredientRemoved = (ingName) =>
    dispatch(actions.removeIngredient(ingName));

  //we useCallback so we don't get INFINITE loop
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    []
  );

  const onInitPurchase = () => dispatch(actions.purchaseInit());

  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((acc, el) => acc + el, 0);
    return sum > 0; //true/false
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      //where should user go after (changes the path for the user after login)
      onSetAuthRedirectPath('/checkout');
      //history comes from React Router
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0; //updates {} eg: bacon: true, salad: false etc.
  }

  let orderSummary = null;

  //set the spinner until we fetch data from the DB
  let burger = error ? <p>Ingredients can't be loaded'</p> : <Spinner />;
  //if I have fetched the data-ingredients, show this
  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          //we need to execute when loads
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          //we can build burger, but after click on order btn proceeds only authenticated user
          isAuth={isAuthenticated}
          price={price}
        />
      </Aux>
    );
    //summary also waiting for the ingredients from the DB
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

// prettier-ignore
export default withErrorHandler(burgerBuilder, axios);
