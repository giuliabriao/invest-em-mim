import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRauth } from "../utils/withSSRauth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return <h1>{user?.email}</h1>;
}

export const getServerSideProps = withSSRauth (async (ctx) => {

  return { 
    props: {}
  }
})