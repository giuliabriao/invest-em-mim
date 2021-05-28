import { parseCookies } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { signOut } from "./AuthContext";

type TransactionsProviderProps = {
  children: ReactNode;
};

type Projects = {
  title: string;
  id: number;
  category:string;
  balance: number;
  created_at: string;
  date_limit: string
}

type Investment = {
  id: number;
  value: number;
  date: string;
  sender: number;
  receptor: number;
}

type ProjectsData = {
  myProjects: Projects[];
  myInvestments: Investment[];
  totalReceipt: number;
  totalInvested: number;
}



export const TransactionsContext = createContext({} as ProjectsData );


export function TransactionsProvider( {children}:TransactionsProviderProps ){
  
  const [myProjects, setMyProject] = useState([]);
  const [myInvestments, setMyInvestments] = useState([]);

  useEffect(() => {
    const { id } = parseCookies();

    try {
      if(id) {
        api.get(`/projects?user_id=${id}`).then((response) => {
          setMyProject(response.data);
        });
    
        api.get(`/transactions?sender=${id}`).then((response) => {
          setMyInvestments(response.data);
        });
      }
    } catch {
      toast.error('Tente novamente em alguns segundos');
      signOut();
    }
  }, []);

  const totalReceipt = myProjects.reduce((sum, total) => {
    return sum + total.balance;
  }, 0)

  const totalInvested = myInvestments.reduce((sum, total) => {
    return sum + total.value;
  }, 0)

  return (
    <TransactionsContext.Provider value={{myProjects, myInvestments, totalReceipt, totalInvested}}>
      {children}
    </TransactionsContext.Provider>
  )



}