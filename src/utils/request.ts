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
export const getToken = () => {
  return localStorage.getItem(localStorageKey);
};

export const setToken = (token: string) => {
  localStorage.setItem(localStorageKey, token || "");
};
export const logout = async () =>
  localStorage.removeItem(localStorageKey);
export const request = <T>(
  url: string,
  data?: cleanObjectProps,
  options: optionsProps = { method: "GET" }
):Promise<T> => {
  let postURL = `${apiURL}${url}`;
  
  if (options.method === "GET") {
    let param = qs.stringify(cleanObject(data));
    postURL += param && `?${qs.stringify(cleanObject(data))}`;
  } else {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json",
    };
  }
  let token = getToken();
  if (token) {
    options.headers = {
      'Authorization':`Bearer ${token}`
    }
  }
  return new Promise((resolve, reject) => {
    return fetch(postURL, options).then(async (res) => {
      if (res.ok) {
        resolve(await res.json());
      } else {
        reject(await res.json());
      }
    });
  });
};
export const login = (params: { username: string; password: string }) => {
  return request(`/login`, params, { method: "POST" }).then((res) => {
    setToken((res as loginProps).user.token);
    return res
  }).catch(err=>{
    console.log(err,'err');
    return Promise.reject(err)
  });
};
export const register = (params: { username: string; password: string }) => {
  return request(`/register`, params, { method: "POST" }).then((res) => {
    setToken((res as loginProps).user.token);
    return res
  }).catch(err=>{
    return Promise.reject(err)
  });
};

