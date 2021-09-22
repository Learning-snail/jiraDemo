import React, { useEffect, useState } from "react";
export interface User {
  id:number;
  name:string;
  token:string
}
interface SearchPannelProps{
  param:{
    name:string;
    personId:string;
  },
  setParam: (param:SearchPannelProps['param'])=>void,
  user: User[],
}

export const SearchPannel = ({ param, setParam, user }:SearchPannelProps) => {
  return (
    <div>
      <input
        type="text"
        value={param.name}
        onChange={(e) =>
          setParam({
            ...param,
            name: e.target.value,
          })
        }
      />
      <select
        name=""
        id=""
        onChange={(e) => {
          setParam({
            ...param,
            personId: e.target.value,
          });
        }}
      >
        <option value="">负责人</option>
        {user.map((user) => (
          <option value={user.id} key={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};
