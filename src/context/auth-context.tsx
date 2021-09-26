import React, { ReactNode, useState } from 'react';
import { Interface } from 'readline';
import { User } from '../screens/project-list/search-pannel';
import { useMount } from '../utils';
import * as auth from '../utils/request';
interface bootstrapUserProp {
    user: object
}
const bootstrapUser = async () => {
    let user = null
    let token = auth.getToken()
    if(token) {
        const data =  await auth.request('/me')
        user = (data as bootstrapUserProp).user
    }
    return user
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
    const [user , setUser] = useState<User | null>(null)
    const login = (params:AuthForm) => auth.login(params).then((res)=>{
        setUser(res as User)
    })
    const register = (params:AuthForm) => auth.register(params).then((res)=>{
        setUser(res as User)
    })
    const logout = () => auth.logout().then(res=>{
        setUser(null)
    })
    useMount(()=>{
        bootstrapUser().then((res) => setUser(res as User))
    })
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
