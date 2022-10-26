import { REQUEST_STATE } from "../constants";

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurantsList: [],
}

export const restaurantActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
}

export const restaurantReducer = (state, action) => {
  switch (action.type) {
    case restaurantActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      }
    case restaurantActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload.restaurants,
      }
    default:
      throw new Error();
  }
}
