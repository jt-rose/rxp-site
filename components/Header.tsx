import React from "react";
import Link from "next/link";

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
    path: "/api",
    icon: "",
  },
  {
    pageTitle: "Regex",
    path: "/regex",
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
    <div className="home-icon">
      <Link href="/">
        <a>RXP</a>
      </Link>
    </div>
    <div className="nav-spacing" />
    <nav>
      {siteLinks.map((link) => (
        <Link href={link.path} key={`${link.pageTitle}-key`}>
          <a>{link.pageTitle}</a>
        </Link>
      ))}
    </nav>
    <style jsx>
      {`
        header {
          width: 100%;
          display: flex;
          border-bottom: 2px solid gray;
          background-color: ${theme.colors.background};
        }
        .nav-spacing {
          flex-grow: 1;
        }
        nav {
          display: flex;
        }
        a {
          margin: 2rem;
          text-decoration: none;
          color: #ffffff;
        }
        @media (min-width: 700px) {
          header, nav {
            display: flex;
            flex-direction: column;
          }
          .nav-spacing {
            flex-grow: 0;
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
