import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("メールアドレスの形式ではありません")
    .required("入力必須の項目です"),
  password: yup.string().required("入力必須の項目です"),
});

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    trigger,
    reset,
  } = useForm({
    // mode: "onBlur",
    // criteriaMode: "all",
    // reValidateMode: "onSubmit",
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const onSubmit = (data, e) => {
    console.log(data, e);
    axios
      .post(
        "http://127.0.0.1:3000/login",
        {
          user: {
            email: data.email,
            password: data.password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("login response: ", response);
        if (response.data.logged_in) {
          history.push("/restaurants");
          props.handleLogin(response.data);
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
    reset();
  };
  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email
            <input id="email" {...register("email", { required: true })} />
          </label>
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label>
            Password
            <input id="password" {...register("password")} type="password" />
          </label>
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <button type="submit" disabled={!dirtyFields.email}>
            ログイン
          </button>
        </div>
        <div>
          <button type="button" onClick={() => trigger()}>
            バリデーション
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
