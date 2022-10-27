import React, { useEffect, useReducer, useState } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom/cjs/react-router-dom';

{/** components */}
import { LocalMallIcon } from '../components/Icons'
import { FoodWrapper } from '../components/FoodWrapper';
import Skeleton from '@mui/material/Skeleton';
import { FoodOrderDialog } from '../components/FoodOrderDialog';

{/** API */}
import { fetchFoods } from '../apis/foods'

{/** images */}
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

{/** reducers */}
import { foodsActionTypes, foodsReducer, initialState as foodsInitialState } from '../reducers/foods'

{/** constants */}
import { REQUEST_STATE } from "../constants";
import { COLORS } from '../style_constants';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

const Foods = ({match}) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
  }
  const [state, setState] = useState(initialState)

  const submitOrder = () => {
    // あとで仮注文のAPIを実装
    console.log('登録ボタンが押された')
    console.log(state.selectedFood.price * state.selectedFoodCount , state.selectedFoodCount)
  }
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
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {
          foodsState.fetchState === REQUEST_STATE.LOADING ?
            <>
              {
                [...Array(12).keys()].map(i =>
                  <ItemWrapper key={i}>
                    <Skeleton key={i} variant="rect" width={450} height={180} />
                  </ItemWrapper>
                )
              }
            </>
          :
            foodsState.foodsList.map(food => (
              <ItemWrapper key={food.id}>
                <FoodWrapper
                  food={food}
                  onClickFoodWrapper={(food) => setState({
                    ...state,
                    isOpenOrderDialog: true,
                    selectedFood: food,
                  })}
                  imageUrl={FoodImage}
                />
              </ItemWrapper>
            ))
        }
      </FoodsList>
      {
        state.isOpenOrderDialog &&
          <FoodOrderDialog
            food={state.selectedFood}
            countNumber={state.selectedFoodCount}
            isOpen={state.isOpenOrderDialog}
            onClickCountUp={() => setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            })}
            onClickCountDown={() => setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            })}
            onClickOrder={submitOrder}
            onClose={() => setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1,
            })}
          />
      }
    </>
  )
}

export default Foods
