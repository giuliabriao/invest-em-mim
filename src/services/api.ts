import axios, { AxiosError } from 'axios';
import {parseCookies} from "nookies";
import { signOut } from '../contexts/AuthContext';
import { AuthError } from './errors/AuthError';

const cookies = parseCookies();


export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['invest.token']}`
  },
})

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError )=> {
  if(error.response.status === 404) {
    if(process.browser) {
      signOut();
    }else {
      Promise.reject(new AuthError());
    }
  }else{
    Promise.reject(error);
  }

  return Promise.reject(error);
})