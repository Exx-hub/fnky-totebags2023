import Head from "next/head";
import Navbar from "../navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>FNKY</title>
        <meta name="title" property="og:title" content="E-commerce Website" />
        <meta
          name="description"
          property="og:description"
          content="E-commerce Website"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Alvin Flores Acosta" />
        <meta
          name="url"
          property="og:url"
          content="https://fnky-totebags2023.vercel.app/"
        />
        <link rel="icon" href="/alv.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
