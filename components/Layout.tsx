import React, { ReactNode } from "react";
//import Link from "next/link";
import Head from "next/head";

import { Header } from "./Header";
type Props = {
  children?: ReactNode;
  title?: string;
  pageTitle?: string;
};

const Layout = ({ children, pageTitle = "RXP", title = "RXP" }: Props) => (
  <div className="site-body">
    
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>
    <Header />

    <div className="main-container">
    <h1>{pageTitle}</h1>
    {children}
    </div>
    </main>
    
    <footer>
      <hr />
      <span>Developed by Jeff Rose, 2020</span>
    </footer>
    <style jsx>{`
      .site-body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      main {
        display: flex;
        flex-direction: column;
      }
      @media (min-width: 700px) {
        main {
          display: flex;
          flex-direction: row;
        }
      }
      .main-container {
        flex: 1 0 auto;
        padding: .7em;
      }
      h1 {
        text-align: center;
      }
    `}</style>
    <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.8;
          color: #333;
          font-family: sans-serif;
        }
      `}</style>
  </div>
);

export default Layout;
