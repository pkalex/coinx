import {
  ADD_COIN,
  GET_COINS,
  GET_COIN,
  DELETE_COIN,
  COIN_LOADING
} from "../actions/types";

const initialState = {
  coins: [],
  coin: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COINS:
      return {
        ...state,
        coins: action.payload,
        loading: false
      };
    case GET_COIN:
      return {
        ...state,
        coin: action.payload,
        loading: false
      };
    case ADD_COIN:
      return {
        ...state,
        coins: [action.payload, ...state.coins]
      };
    case DELETE_COIN:
      return {
        ...state,
        coins: state.coins.filter(coin => coin._id !== action.payload)
      };
    default:
      return state;
  }
}
