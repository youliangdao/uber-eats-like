import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { auth, app } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        history.push("/restaurants");
        handleLogin(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    setEmail("");
    setPassword("");
  };

  // const handleSubmit = (e, email, password) => {
  //   e.preventDefault();
  //   axios
  //     .post(
  //       "http://127.0.0.1:3000/signup",
  //       {
  //         user: {
  //           email: email,
  //           password: password,
  //           password_confirmation: password,
  //         },
  //       },
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       console.log("registration res", response);
  //       if (response.data.status === "created") {
  //         history.push("/restaurants");
  //         props.handleLogin(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("registration error", error);
  //     });
  //   setEmail("");
  //   setPassword("");
  // };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <label>
            Email
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
