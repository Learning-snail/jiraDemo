import { cleanObject, cleanObjectProps } from "./index";
import * as qs from "qs";
const apiURL = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";

interface optionsProps {
  method: string;
  data?: object;
  body?: string;
  headers?: HeadersInit;
}
interface loginProps {
  user: {
    token: string;
  };
}
export const request = (
  url: string,
  data?: cleanObjectProps,
  options: optionsProps = { method: "GET" }
) => {
  let postURL = `${apiURL}${url}`;
  if (options.method === "GET") {
    postURL += `?${qs.stringify(cleanObject(data))}`;
  } else {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json",
    };
  }
  return new Promise((resolve, reject) => {
    fetch(postURL, options).then(async (res) => {
      if (res.ok) {
        resolve(await res.json());
      } else {
        reject(res);
      }
    });
  });
};

export const getToken = () => {
  return localStorage.getItem(localStorageKey);
};

export const setToken = (token: string) => {
  localStorage.setItem(localStorageKey, token || "");
};
export const login = (params: { username: string; password: string }) => {
  return request(`/login`, params, { method: "POST" }).then((res) => {
    setToken((res as loginProps).user.token);
    return res
  });
};
export const register = (params: { username: string; password: string }) => {
  return request(`/register`, params, { method: "POST" }).then((res) => {
    setToken((res as loginProps).user.token);
    return res
  });
};
