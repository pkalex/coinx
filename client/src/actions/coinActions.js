import axios from "axios";

import {
  ADD_COIN,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_COINS,
  GET_COIN,
  COIN_LOADING,
  DELETE_COIN
} from "./types";

// Add Coin
export const addCoin = coinData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/coins", coinData)
    .then(res =>
      dispatch({
        type: ADD_COIN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Coins
export const getCoins = () => dispatch => {
  dispatch(setCoinLoading());
  axios
    .get("/api/coins")
    .then(res =>
      dispatch({
        type: GET_COINS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COINS,
        payload: null
      })
    );
};

// Get Coin
export const getCoin = id => dispatch => {
  dispatch(setCoinLoading());
  axios
    .get(`/api/coins/${id}`)
    .then(res =>
      dispatch({
        type: GET_COIN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COIN,
        payload: null
      })
    );
};

// Delete Coin
export const deleteCoin = id => dispatch => {
  axios
    .delete(`/api/coins/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_COIN,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setCoinLoading = () => {
  return {
    type: COIN_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
