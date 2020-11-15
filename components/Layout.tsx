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
  <div className="site-container">
    
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <div className="site-content">
    
    
      
      <main>
      <h1>{pageTitle}</h1>
    {children}
    <footer>
      <hr />
      <span>Developed by Jeff Rose, 2020</span>
    </footer>
    </main>
      
    
    </div>
    
    <style jsx>{`
      .site-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
      }
      @media (min-width: 700px) {
        .site-container {
          flex-direction: row;
        }
      }
      .site-content {
        display: flex;
        flex-direction: column;
        padding: .7em;
        flex-grow: 1;
      }
      main {
        flex-grow: 1
      }
      h1 {
        text-align: center;
      }
      footer {
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
