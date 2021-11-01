import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const { search } = useLocation();
  const paramsString = search.substring(1);
  const [searchParams] = useState(new URLSearchParams(paramsString));
  return [
    useMemo(
      () =>
        keys.reduce((pre, key) => {
          return { ...pre, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams,keys]
    ),
    searchParams,
  ] as const;
};
