import Head from "next/head";
import { ToastContainer, Slide } from "react-toastify";

import Footer from "../src/components/Footer/Footer";
import Nav from "../src/components/Header/Nav";

import CartContextProvider from "../src/context";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import 'react-medium-image-zoom/dist/styles.css'

import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Primo negozio online in Italia di giochi islamici - Ummay Toys"
        />
        <meta
          name="keywords"
          content="giochi, islam, musulmano, muslim, bambini, bambini musulmani, giochi islamici, giochi musulmani"
        />
        <meta name="author" content="Ummah Toys" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NextNProgress color="#38BDF8" height={6} />
      <CartContextProvider>
        <ToastContainer
          autoClose={4000}
          closeButton={false}
          hideProgressBar
          transition={Slide}
        />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </CartContextProvider>
    </>
  );
}

export default MyApp;
