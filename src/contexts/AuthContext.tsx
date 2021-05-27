import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { toast } from 'react-toastify';

type signInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signInPage(credentials: signInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  avatar: string;
  balance: number;
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  username: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "invest.token");
  destroyCookie(undefined, "me");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "invest.token": token } = parseCookies();
    const { me } = parseCookies();

    if (token) {
      api
        .get(`/users/me?username=${me}`)
        .then((response) => {
          const { avatar, balance, email, firstName, lastName, username, id } =
            response.data[0];
            
          setUser({
            avatar,
            balance,
            email,
            firstName,
            lastName,
            username,
            id,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signInPage({ email, password }: signInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { avatar, balance, firstName, lastName, username, id } =
        response.data.user;

      const { token } = response.data;

      setCookie(undefined, "invest.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setCookie(undefined, "me", username, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        email,
        avatar,
        balance,
        firstName,
        lastName,
        id,
        username,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      toast.success('Iniciando a sessao');
      Router.push("/dashboard");
    } catch {
      toast.error('Email ou senha invalidos');
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signInPage, user }}>
      {children}
    </AuthContext.Provider>
  );
}
