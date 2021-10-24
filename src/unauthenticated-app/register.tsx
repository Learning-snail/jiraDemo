import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from ".";
export const RegisterScreens = ({onError}:{onError:(error:Error)=>void}) => {
  let {register} = useAuth()
  const handleSubmit = ({cpassword,...value}:{username:string,password:string,cpassword:string}) => {
    if(cpassword!==value.password) {
     onError(new Error('请确认2次输入的密码相同'))
     return 
    }
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
      <Form.Item  name="cpassword" rules={[{required:true,message:"请确认密码"}]}>
        <Input type="password" id="cpassword" placeholder='密码' />
      </Form.Item>
      <LongButton type={"primary"}  htmlType={'submit'}>注册</LongButton>
    </Form>
  );
};
