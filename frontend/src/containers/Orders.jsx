import React from 'react'
import { useEffect, useReducer } from 'react'
import { fetchLineFoods } from '../apis/line_foods'

// reducers
import {
  initialState,
  lineFoodsActionTypes,
  LineFoodsReducer,
} from "../reducers/lineFoods";

const Orders = () => {
  const [state, dispatch] = useReducer(LineFoodsReducer, initialState)

  useEffect(() => {
    dispatch({type: lineFoodsActionTypes.FETCHING});
    fetchLineFoods().then(data => {
      dispatch({
        type: lineFoodsActionTypes.FETCH_SUCCESS,
        payload: {
          lineFoodsSummary: data,
        }
      })
    }).catch(e => console.error(e))

  }, [])

  return (
    <div>Orders</div>
  )
}

export default Orders
