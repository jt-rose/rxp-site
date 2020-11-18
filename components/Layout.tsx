import React, { useState, ReactNode } from "react";
import Head from "next/head";
import theme from "../styles/theme";
import { Header } from "./Header";

/* temporarily remove icons while resolving hook calls error - duplicate react versions?
import { SiReact, SiNextDotJs, SiTypescript } from "react-icons/si"
type IconTypes = typeof SiReact | typeof SiNextDotJs | typeof SiTypescript;

const createIconWithHover = (Icon: IconTypes, linkPath: string) => () => {
  const [isHovered, setHover] = useState(false);
  return (
    <a href={linkPath}>
    <Icon 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      color={isHovered ? theme.colors.background : "black"}
    />
    <style jsx>{`
    a {
      padding-left: .2em;
    }
    `}</style>
    </a>
  )
};
const ReactIcon = createIconWithHover(SiReact, "https://reactjs.org/");
const NextJSIcon = createIconWithHover(SiNextDotJs, "https://nextjs.org/");
const TypeScriptIcon = createIconWithHover(SiTypescript, "https://www.typescriptlang.org/");
*/
const formattedThemeBKG = theme.colors.background.replace("#", "");
const badgeSize = "1.1";

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
    <div className="site-badges">
    <a href="https://www.github.com/jt-rose/rxp">
    <img src={`https://badgen.net/github/release/jt-rose/rxp?icon=github&label&scale=${badgeSize}&color=${formattedThemeBKG}`} alt="Github"/>
    </a>
    <a href="https://www.npmjs.com/package/rxp">
    <img src={`https://badgen.net/badge/icon/v1.4.5?icon=npm&label&scale=${badgeSize}&color=${formattedThemeBKG}`} alt="NPM"/>
    </a>
    <a href="https://www.typescriptlang.org/">
    <img src={`https://badgen.net/badge/icon/TypeScript?icon=typescript&label&scale=${badgeSize}&color=${formattedThemeBKG}`} alt="TypeScript" />
    </a>
    </div>
      <main>
        <h1>{pageTitle}</h1>
    {children}
    </main>


    <footer>
      <div className="footer-spacing" />
      <span>Developed by Jeff Rose, 2020</span>
      <div className="techstack-icons">
        {/*<ReactIcon />
        <NextJSIcon />
        <TypeScriptIcon />*/}
      </div>
    </footer>
    
    </div>
    
    <style jsx>{`
    .test {
      color: blue;
    }
    .test:hover {
      color: yellow;
    }
      .site-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
      }
      @media (min-width: ${theme.breakPoints.desktopWidth}) {
        .site-container {
          flex-direction: row;
        }
      }
      .site-badges {
        text-align: right;
      }
      .site-badges a {
        padding-left: .2em;
      }
      .site-content {
        display: flex;
        flex-direction: column;
        padding: 1em 1em .5em;
        flex-grow: 1;
      }
      main {
        flex-grow: 1;
        max-width: 700px;
        margin: auto;
      }
      h1 {
        text-align: center;
      }
      footer {
        border-top: solid gray 2px;
        display: flex;
        justify-content: space-between;
      }
      .techstack-icons {
        padding-right: 1em;
      }
    `}</style>
    <style jsx global>{`
        html, body {
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
