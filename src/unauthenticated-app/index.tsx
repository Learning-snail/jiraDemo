import { Card, Divider, Button, Typography } from "antd";
import React, { useState } from "react";
import { LoginScreens } from "./login";
import { RegisterScreens } from "./register";
import styled from "@emotion/styled";
import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
export const UnauthenticatedApp = () => {
  const [LoginStatus, setLoginStatus] = useState(true);
  const [error, setError] = useState<Error|null>(null)
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{LoginStatus ? "请登录" : "请注册"}</Title>
        {error?<Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
        {LoginStatus ? <LoginScreens onError={setError}/> : <RegisterScreens onError={setError}/>}
        <Divider />
        <Button onClick={() => setLoginStatus(!LoginStatus)} type={"link"}>
          {LoginStatus ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};
export const LongButton = styled(Button)`
  width: 100%;
`;
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
const Header = styled.header`
  background: url(${logo}) no-repeat center/ 8rem;
  padding: 5rem 0;
  width: 100%;
`;
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
