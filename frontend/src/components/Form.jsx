import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup
    .string()
    .email("メールアドレスの形式ではありません")
    .required("入力必須の項目です"),
  password: yup.string().required("入力必須の項目です"),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    trigger,
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
  console.log(errors);
  // const handleChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const handleChangePassword = (e) => {
  //   setPassword(e.target.value);
  // };
  const onSubmit = (data) => {
    console.log(data, errors);
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

export default Form;
