import React, { ReactNode, useState } from 'react';
import { User } from '../screens/project-list/search-pannel';
import { useMount } from '../utils';
import * as auth from '../utils/request';
import { useAsync } from '../utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
interface bootstrapUserProp {
    user: object
}
const bootstrapUser = async ():Promise<User | null> => {
    let user  = null
    let token = auth.getToken()
    if(token) {
        const data =  await auth.request('/me')
        user = (data as bootstrapUserProp).user
    }
    return user as User
}
const AuthContext = React.createContext<{
    user: User | null;
    login: (params: AuthForm) => Promise<void>;
    register: (params: AuthForm) => Promise<void>;
    logout: () => void;
} | undefined>(undefined)
interface AuthForm{
    username: string;
    password: string
}
export const AuthProvider = ({children}:{children:ReactNode}) => {
    const {
        data: user,
        error,
        isLoading,
        isIdle,
        isError,
        run,
        setData: setUser,
      } = useAsync<User | null>();
    const login = (params:AuthForm) => auth.login(params).then((res)=>{
        setUser(res as User)
    })
    const register = (params:AuthForm) => auth.register(params).then((res)=>{
        setUser(res as User)
    })
    const logout = () => auth.logout().then(res=>{
        setUser(null)
    })
    useMount(() => {
        run(bootstrapUser());
      });
    
      if (isIdle || isLoading) {
        return <FullPageLoading />;
      }
    
      if (isError) {
        return <FullPageErrorFallback error={error} />;
      }
    return (
        <AuthContext.Provider value={{user,login,register,logout}} children={children} />
    )
}
export const useAuth = ()=>{
    const context = React.useContext(AuthContext);
    if(!context){
        throw new Error('只能在AuthProviders中使用')
    }
    return context
}
