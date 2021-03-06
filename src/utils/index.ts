import { useEffect, useRef, useState } from "react";
export interface cleanObjectProps {
  [prop : string] : unknown
}
export const isFalse = (value: unknown) => (value === 0 ? true : !!value);
export const isVoid = (value: unknown) => (value === null || value ===undefined || value === '');
export const cleanObject =(obj?:cleanObjectProps) => {
    if (!obj) return; 
  const result:cleanObjectProps = {};
  
  for (const key in obj) {
    
    if (!isVoid(obj[key])) {
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
export const useDocumentTitle = (title:string, keepOnUnmount:boolean=true) => {
  const oldTitle = useRef(document.title).current
  useEffect(()=>{
    document.title = title
  },[title])
  useEffect(()=>{
    return ()=>{
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  },[keepOnUnmount,title])
}
export const resetRoute = ()=> window.location.href = window.location.origin
