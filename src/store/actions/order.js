import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//sync action creator, data under action.
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

//sync action creator
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

//async action creator, action we dispatch from the container, once we clicked the order btn
export const purchaseBurger = (orderData, token) => {
  //using redux thunk middleware
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    //firebase needs .json!!!
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

//will be dispatch whenever we load the checkout page
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    //pass orders as payload
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

//we pass on the token in Orders/Orders
export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart()); //loading
    //getting orders only for a specific user, url params as per firebase documentation
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      //add token for auth, this is how we send the token to the backend
      .get('/orders.json' + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        //we transform the data from DB here in actions rather than in reducer, if I'd change backend (data format)=> need to change reducer
        //we get from Firebase an object in data -> array
        for (let key in res.data) {
          //keys are unique firebase IDs =>  their values is the data we need
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
