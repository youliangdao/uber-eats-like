import React, { useEffect } from 'react'
import { useReducer } from 'react'

{/** API */}
import { fetchFoods } from '../apis/foods'

{/** reducers */}
import { foodsActionTypes, foodsReducer, initialState as foodsInitialState } from '../reducers/foods'

{/** constants */}
import { REQUEST_STATE } from "../constants";

const Foods = ({match}) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  useEffect(() => {
    dispatch({
      type: foodsActionTypes.FETCHING,
    })
    fetchFoods(match.params.restaurantId).then(data => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods,
        }
      })
    })
  }, [])

  return (
    <>
      {
        foodsState.fetchState === REQUEST_STATE.LOADING ?
          <>
            <p>ロード中...</p>
          </>
        :
        foodsState.foodsList.map(food => (
          <div key={food.id}>
            {food.restaurant_id}
            {food.name}
          </div>
        ))
      }
    </>
  )
}

export default Foods
