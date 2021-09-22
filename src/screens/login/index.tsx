import React, { FormEvent, FormEventHandler, useState } from "react";
import { request, setToken } from "../../utils/request";
import { User } from "../project-list/search-pannel";
interface loginProps {
  user: {
    token: string;
  };
}

export const LoginScreens = () => {
  const login = (params: { username: string; password: string }) => {
    request(`/register`, params, { method: "POST" }).then(
      (res) => {
        setToken((res as loginProps).user.token);
      }
    );
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">账号</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type={"submit"}>注册</button>
    </form>
  );
};
