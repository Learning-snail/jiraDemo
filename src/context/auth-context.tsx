import React, { ReactNode, useState } from 'react';
import { Interface } from 'readline';
import { User } from '../screens/project-list/search-pannel';
import * as auth from '../utils/request'
const AuthContext = React.createContext<{
    user: User | null;
    login: (params: AuthForm) => Promise<void>;
    register: (params: AuthForm) => Promise<void>;
} | undefined>(undefined)
interface AuthForm{
    username: string;
    password: string
}
export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user , setUser] = useState<User | null>(null)
    const login = (params:AuthForm) => auth.login(params).then((res)=>{
        setUser(res as User)
    })
    const register = (params:AuthForm) => auth.register(params).then((res)=>{
        setUser(res as User)
    })
    return (
        <AuthContext.Provider value={{user,login,register}} children={children} />
    )
}
export const useAuth = ()=>{
    const context = React.useContext(AuthContext);
    if(!context){
        throw new Error('只能在AuthProviders中使用')
    }
    return context
}
