import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// const clickHandler = () => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// };

const Registration = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = (e, email, password) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:3000/signup",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("registration res", response);
        if (response.data.status === "created") {
          history.push("/restaurants");
          props.handleLogin(response.data);
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>新規登録</h1>
      <form onSubmit={(e) => handleSubmit(e, email, password)}>
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
          <button type="submit">新規登録</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
