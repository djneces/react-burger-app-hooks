import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = (props) => {
  const checkoutCancelledHandler = () => {
    //special props from the Route in App.js
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  //when I hit enter or reload it redirects me back to start
  let summary = <Redirect to='/' />;

  //once ingredients are available, render checkout summary
  if (props.ings) {
    //once purchased redirects to home page
    const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        {/* dynamic route  */}
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    //state.ingredients -> named exactly as in reducer
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

//we don't need dispatch here

//if I don't need mapStateToProps, but I use dispatch => export default connect(null, mapDis)(Checkout);
export default connect(mapStateToProps)(checkout);
