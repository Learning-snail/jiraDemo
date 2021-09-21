import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import React, { useState, useEffect } from "react";
import { request } from "../../utils/request";
import {useMount,useDebounce} from '../../utils/index'
export const ProjectListScreen = () => {
  const [param, setParam] = useState<any>({
    name: "",
    personId: "",
  });
  const [user, setUser] = useState<any>([]);
  const [list, setList] = useState<any>([]);
  const usedebouncedParams = useDebounce(param ,1000)
  useEffect(() => {
    request(`/projects`, usedebouncedParams).then(async (res) => {
      setList(res);
    });
  }, [usedebouncedParams]);
  useMount(() => {
    request(`/users`).then(async (res) => {
      setUser(res);
    });
  });
  return (
    <div>
      <SearchPannel
        param={param}
        setParam={setParam}
        user={user}
      ></SearchPannel>
      <List list={list} user={user}></List>
    </div>
  );
};
