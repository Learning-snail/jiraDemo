import { cleanObject } from "./index";
import * as qs from "qs";
const apiURL = process.env.REACT_APP_API_URL;
const localStorageKey = '__auth_provider_token__';
interface optionsProps {
  method: string;
  data?: object;
  body?: string;
  headers?:string[][]
}
export const request = (
  url: string,
  options: optionsProps = { method: "GET" }
):Promise<object> => {
  let postURL = `${apiURL}${url}`;
  if (options.method === "GET") {
    postURL += `?${qs.stringify(cleanObject(options.data))}`;
  } else {
    options.body = JSON.stringify(options.data);
    options.headers = [["Content-Type","application/json"]]
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
  return localStorage.getItem(localStorageKey)
}

export const setToken = (token:string) => {
  localStorage.setItem(localStorageKey,token || '')
}
