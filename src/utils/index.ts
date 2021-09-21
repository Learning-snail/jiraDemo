import { useEffect, useState } from "react";

export const isFalse = (value: unknown) => (value === 0 ? true : !!value);
export const cleanObject = (obj?:object) => {
    if (!obj) return; 
  const result = {};
  
  for (const key in obj) {
      // @ts-ignore
    if (isFalse(obj[key])) {
        // @ts-ignore
      result[key] = obj[key];
    }
  }
  return result;
};
export const useMount = (callback:()=>void) => {
  useEffect(() => {
    callback();
  }, []);
};
export const useDebounce = <V>(value:V, delay?:number) => {
  const [debounceParam, setDebounceParam] = useState(value);
  useEffect(() => {
    let timer:number = 0;
    timer = setTimeout(() => {
      setDebounceParam(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value]);
  return debounceParam;
};
