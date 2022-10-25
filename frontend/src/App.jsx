import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { Switch } from 'react-router-dom/cjs/react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css'
import Foods from './containers/Foods'
import Orders from './containers/Orders'
import Restaurants from './containers/Restaurants';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        {/** 店舗一覧ページ */}
        <Route
          exact
          path="/restaurants"
          render={() => <Restaurants />}
        />
        {/** フード一覧ページ */}
        {/* <Route
          exact
          path="/foods"
        >
          <Foods />
        </Route> */}
        {/** 注文ページ */}
        <Route
          exact
          path="/orders"
        >
          <Orders />
        </Route>

        {/** フード一覧ページにpropsを渡してみる */}
        <Route
          exact
          path="/restaurants/:restaurantId/foods"
          render={({match}) =>
            <Foods
              match={match}
            />
          }
        />

      </Switch>
    </BrowserRouter>
  )
}

export default App
