import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

import { SessionProvider } from "next-auth/react";
import ContextProvider from "../context/ContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
