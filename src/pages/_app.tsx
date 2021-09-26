import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";

import { Header } from "../components/Header";

import "../../styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
export default MyApp;
