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
  category: string;
  balance: number;
  created_at: string;
  date_limit: string;
  deleted_at: string;
  description: string;
};

type Investment = {
  id: number;
  value: number;
  date: string;
  sender: number;
  receptor: number;
};

type EditProjectData = {
  title: string;
  description: string;
  id: number;
};

type TransactionProps = {
  value: string;
  sender: string;
  receptor: number;
}

type ProjectsData = {
  myProjects: Projects[];
  myInvestments: Investment[];
  totalReceipt: number;
  totalInvested: number;
  editProject(data: EditProjectData): Promise<void>;
  deleteProject(id: number): Promise<void>;
  setReload: (reload: boolean) => void;
  newTransaction(data: TransactionProps): Promise<void>;
  reload: boolean;
};

export const TransactionsContext = createContext({} as ProjectsData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [myProjects, setMyProject] = useState([]);
  const [myInvestments, setMyInvestments] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const { id } = parseCookies();

    try {
      if (id) {
        api.get(`/projects?user_id=${id}`).then((response) => {
          setMyProject(response.data);
        });

        api.get(`/transactions?sender=${id}`).then((response) => {
          setMyInvestments(response.data);
        });
      }
    } catch {
      toast.error("Tente novamente em alguns segundos");
      signOut();
    }
  }, [reload]);

  async function editProject({ title, description, id }) {
    try {
      await api.put(`/projects/${id}`, {
        title,
        description,
      });
      toast.success("Projeto editado com sucesso");
    } catch {
      toast.error("Ocorreu um erro, tente novamente.");
    }
  }


  async function newTransaction({ value, sender, receptor}) {
    try {
      await api.post('/transactions', {
        value,
        date: new Date(),
        sender,
        receptor
      });
      toast.success("Transação efetuada com sucesso");
    } catch {
      toast.error("Ocorreu um erro, falha na transação.");
    }
  }



  async function deleteProject(id) {
    try {
      await api.delete(`/projects/${id}`);
      setReload(!reload)
      toast.success("Projeto deletado com sucesso");
    } catch {
      toast.error("Ocorreu um erro, tente novamente.");
    }
  }

  const totalReceipt = myProjects.reduce((sum, total) => {
    return sum + total.balance;
  }, 0);

  const totalInvested = myInvestments.reduce((sum, total) => {
    return sum + total.value;
  }, 0);

  return (
    <TransactionsContext.Provider
      value={{
        myProjects,
        myInvestments,
        totalReceipt,
        totalInvested,
        editProject,
        setReload,
        reload,
        deleteProject,
        newTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
