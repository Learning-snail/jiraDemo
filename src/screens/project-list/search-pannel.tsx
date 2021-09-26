import { Input,Select } from "antd";
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
      <Input
        type="text"
        value={param.name}
        onChange={(e) =>
          setParam({
            ...param,
            name: e.target.value,
          })
        }
      />
      <Select
      value={param.personId}
        onChange={(value) => {
          setParam({
            ...param,
            personId: value,
          });
        }}
      >
        <Select.Option value="">负责人</Select.Option>
        {user.map((user) => (
          <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
        ))}
      </Select>
    </div>
  );
};
