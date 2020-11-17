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
  <header>
    <nav>
    <Link href="/">
        <a>
        <FontAwesomeIcon icon={faHome} size="2x" color="#fff"/>
        </a>
      </Link>
      <div className="nav-spacing" />
      {siteLinks.map((link) => (
        <Link href={link.path} key={`${link.pageTitle}-key`}>
          <a>{link.pageTitle}</a>
        </Link>
      ))}
    </nav>
    <style jsx>
      {`
        nav {
          display: flex;
          background-color: ${theme.colors.background};
          position: sticky;
          top: 0;
          font-weight: bold;
        }
        .nav-spacing {
          flex-grow: 1;
        }
        nav {
          display: flex;
        }
        a {
          padding: .7em 2em .5em;
          text-decoration: none;
          color: #ffffff;
        }
        nav a:hover {
          background-color: ${theme.colors.backgroundHover};
        }
        @media (min-width: ${theme.breakPoints.desktopWidth}) {
          nav {
            display: flex;
            flex-direction: column;
            height: 100vh;
          }
          .nav-spacing {
            flex-grow: 0;
          }
          a {
            padding: .5em 2em;
          }
          nav a:first-of-type {
            padding-top: 1em;
          }
        }

      `}
    </style>
  </header>
);
// notes
// mobile: Home...............Hamburger
// tablet: Home......icons...
// desktop: Home...Icons+Name....
