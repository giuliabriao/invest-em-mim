import { useContext } from "react";
import { Header } from "../components/Header";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRauth } from "../utils/withSSRauth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header/>
    </>
  )
}

export const getServerSideProps = withSSRauth (async (ctx) => {

  return { 
    props: {}
  }
})