import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import theme from "../styles/theme";

/*
const RXPHeader = styled.header`
  width: 100%;
  display: flex;
`;

const HeaderSpacing = styled.div`
  flex-grow: 1;
`;

export const Header = () => (
  <RXPHeader>
    <div>RXP</div>
    <HeaderSpacing />
    <div>Menu</div>
  </RXPHeader>
);
*/

const siteLinks = [
  /*{
    pageTitle: "Home",
    path: "/",
    icon: "",
  },*/
  {
    pageTitle: "Guide",
    path: "/guide",
    icon: "",
  },
  {
    pageTitle: "API",
    path: "/api-guide",
    icon: "",
  },
  {
    pageTitle: "Regex",
    path: "/regex-guide",
    icon: "",
  },
  {
    pageTitle: "Playground",
    path: "/playground",
    icon: "",
  },
];

export const Header = () => (
    <nav>
    <Link href="/">
        <a>
        <FontAwesomeIcon icon={faHome} size="2x" color="#fff"/>
        </a>
      </Link>
      {siteLinks.map((link) => (
        <Link href={link.path} key={`${link.pageTitle}-key`}>
          <a>{link.pageTitle}</a>
        </Link>
      ))}
    
    <style jsx>
      {`
        nav {
          display: flex;
          background-color: ${theme.colors.background};
          position: sticky;
          top: 0;
          font-weight: bold;
          border-bottom: 1px solid ${theme.colors.backgroundHover};
        }
        a {
          padding: .7em 0 .5em;
          text-decoration: none;
          color: #ffffff;
          flex-grow: 1;
          text-align: center;
        }
        nav a:hover {
          background-color: ${theme.colors.backgroundHover};
        }
        @media (min-width: ${theme.breakPoints.desktopWidth}) {
          nav {
            display: flex;
            flex-direction: column;
            height: 100vh;
            border-bottom: 0 none #ccc;
          }
          a {
            padding: .5em 2em;
            flex-grow: 0;
            text-align: left;
          }
          nav a:first-of-type {
            padding-top: 1em;
          }
        }

      `}
    </style>
    </nav>
);
// notes
// mobile: Home...............Hamburger
// tablet: Home......icons...
// desktop: Home...Icons+Name....
