import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from ".";
export const RegisterScreens = () => {
  let {register,user} = useAuth()
  const handleSubmit = (value:{username:string,password:string}) => {
    register(value);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{required:true,message:"请输入用户名"}]}>
        <Input type="text" id="username" placeholder='用户名' />
      </Form.Item>
      <Form.Item  name="password" rules={[{required:true,message:"请输入密码"}]}>
        <Input type="password" id="password" placeholder='密码' />
      </Form.Item>
      <LongButton type={"primary"}  htmlType={'submit'}>注册</LongButton>
    </Form>
  );
};
