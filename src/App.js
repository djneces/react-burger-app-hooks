//suspense for lazy loading
import React, { useEffect, Suspense } from 'react';
//connect breaks the app => we need withRouter
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

//lazy loading, we don't need them right away, they are loaded when needed (here might not be any gain)
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const app = (props) => {
  const { onTryAutoSignUp } = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]); //runs whenever this function changes

  //unauthenticated routes
  let routes = (
    <Switch>
      {/* ...props so we don't get undefined */}
      <Route path='/auth' render={(props) => <Auth {...props} />} />
      <Route path='/' exact component={BurgerBuilder} />
      {/* redirect for any unknown route  */}
      <Redirect to='/' />
    </Switch>
  );

  //authenticated routes = guards (can't access even manually via url)
  if (props.isAuthenticated) {
    routes = (
      /* Switch => only one route loaded  */
      <Switch>
        <Route path='/checkout' render={(props) => <Checkout {...props} />} />
        <Route path='/orders' render={(props) => <Orders {...props} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={(props) => <Auth {...props} />} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <div>
      {/* fallback => what is shown while lazy loading  */}
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    //access order and checkout page only when authenticated
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

//withRouter forces the props being passed down the components
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
