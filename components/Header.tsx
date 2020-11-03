import React from "react";
import Link from "next/link";

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
    pageTitle: "Regex-Guide",
    path: "/regex-guide",
    icon: "",
  },
  {
    pageTitle: "Constructor",
    path: "/constructor",
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
        }
        .nav-spacing {
          flex-grow: 1;
        }
        a {
          margin: 2rem;
          text-decoration: none;
        }
      `}
    </style>
  </header>
);
// notes
// mobile: Home...............Hamburger
// tablet: Home......icons...
// desktop: Home...Icons+Name....
