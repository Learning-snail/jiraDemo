import { Input, Select, Form } from "antd";
import React from "react";
import { project } from "./list";
export interface User {
  id: number;
  name: string;
  token: string;
}

interface SearchPannelProps {
  param: Pick<project,'personId' | 'name'>;
  setParam: (param: SearchPannelProps["param"]) => void;
  user: User[];
}

export const SearchPannel = ({ param, setParam, user }: SearchPannelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        >
          <Select.Option value={0}>负责人</Select.Option>
          {user.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
