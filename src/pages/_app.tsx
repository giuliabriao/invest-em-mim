import "../styles/globals.scss";
import { AppProps } from "next/app";
import Head from "next/head";

import 'react-toastify/dist/ReactToastify.css';

//slider
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

import "../styles/slider.scss";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Invest em mim | Home</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default MyApp;
