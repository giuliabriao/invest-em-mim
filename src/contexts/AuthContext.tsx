import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import Router from 'next/router';
import  { setCookie } from 'nookies';


type signInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signInPage(credentials: signInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

type User  = {
  avatar: string;
  balance: number;
  email: string;
  firstName: string;
  lastName: string;
  id: number;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }:AuthProviderProps) {

  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function signInPage ({email, password }: signInCredentials){
    try {
      const response = await api.post('sessions', {
        email,
        password
      })
      const { token, avatar, balance, firstName, lastName, id,} = response.data
      
      setCookie(undefined, 'invest.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({
        email,
        avatar,
        balance,
        firstName,
        lastName,
        id,
      })

      Router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, signInPage, user}}>
      {children}
    </AuthContext.Provider>
  )
}