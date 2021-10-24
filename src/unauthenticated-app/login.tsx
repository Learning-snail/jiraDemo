import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from ".";
import { useAsync } from "../utils/use-async";
export const LoginScreens = ({onError}:{onError:(error:Error)=>void}) => {
  let {login} = useAuth()
  let {isLoading, run} = useAsync()
  const handleSubmit = async (value:{username:string,password:string}) => { 
    try {
      await run(login(value))
    } catch (e) {
      onError(e as Error)
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{required:true,message:"请输入用户名"}]}>
        <Input type="text" id="username" placeholder='用户名' />
      </Form.Item>
      <Form.Item  name="password" rules={[{required:true,message:"请输入密码"}]}>
        <Input type="password" id="password" placeholder='密码' />
      </Form.Item>
      <LongButton loading={isLoading} type={"primary"} htmlType={'submit'}>登录</LongButton>
    </Form>
  );
};
