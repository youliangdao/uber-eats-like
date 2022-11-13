import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, useHistory } from "react-router-dom/cjs/react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Foods from "./containers/Foods";
import Orders from "./containers/Orders";
import Restaurants from "./containers/Restaurants";
import Login from "./components/Login";
import Registration from "./components/Registration";
import axios from "axios";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう");
    setUser(data);
  };
  const handleLogout = () => {
    setLoggedInStatus("未ログイン");
    setUser({});
  };

  console.log(user);
  // const checkLoginStatus = () => {
  //   axios
  //     .get("http://127.0.0.1:3000/logged_in", { withCredentials: true })
  //     .then((response) => {
  //       if (response.data.logged_in && loggedInStatus === "未ログイン") {
  //         setLoggedInStatus("ログインなう");
  //         setUser(response.data.user);
  //       } else if (
  //         !response.data.logged_in &&
  //         loggedInStatus === "ログインなう"
  //       ) {
  //         setLoggedInStatus("未ログイン");
  //         setUser({});
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("ログインエラー", error);
  //     });
  // };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        {
          /** rails側に認証情報を送信して、ログインできるかどうかを検証 */
        }
        const token = authUser.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        try {
          await axios.get("http://127.0.0.1:3000/login", config);
        } catch (error) {
          console.log(error);
        }

        setUser(authUser);
        setLoggedInStatus("ログインなう");
      } else {
        handleLogout();
      }
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {/** 店舗一覧ページ */}
        <Route
          exact
          path="/restaurants"
          render={(props) => (
            <Restaurants
              {...props}
              loggedInStatus={loggedInStatus}
              handleLogout={handleLogout}
            />
          )}
        />
        {/** 注文ページ */}
        <Route exact path="/orders">
          <Orders />
        </Route>

        {/** フード一覧ページにpropsを渡してみる */}
        <Route
          exact
          path="/restaurants/:restaurantId/foods"
          render={({ match }) => <Foods match={match} />}
        />

        {/** 新規登録フォーム */}
        <Route
          exact
          path="/registration"
          render={(props) => (
            <Registration {...props} handleLogin={handleLogin} />
          )}
        />

        {/** ログインフォーム */}
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} handleLogin={handleLogin} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
