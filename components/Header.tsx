import React from "react";
import Link from "next/link";

import { FaHome} from "react-icons/fa";

import theme from "../styles/theme";

const siteLinks = [
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
        <FaHome size="2em" color="#fff"/>
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
          padding: .7em 0 0;
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