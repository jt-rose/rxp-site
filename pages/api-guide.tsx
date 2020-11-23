import Layout from "../components/Layout";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { APIKeyData, APIData } from "../utils/APIData";
import { CodeSample } from "../components/CodeSample";
import theme from "../styles/theme";

import { FaSortDown } from "react-icons/fa";

const backgroundColor = theme.colors.background;
const backgroundHover = theme.colors.backgroundHover;

const {
  step1Data,
  step2Data,
  step2point5data,
  step3Data,
  step4Data,
  step5Data,
} = APIData;
const allStepsData = [
  ...step1Data,
  ...step2Data,
  ...step2point5data,
  ...step3Data,
  ...step4Data,
  ...step5Data,
];

interface APISection {
  title: string;
  ApiKeys: APIKeyData[]
}

const APIGuideSections: APISection[] = [
  {
    title: "RXP Constructor",
    ApiKeys: APIData.RXPUnitData,
  },
  {
    title: "RXP Methods",
    ApiKeys: allStepsData,
  },
  // add more methods
  {
    title: "Presets",
    ApiKeys: APIData.presetsData,
  },
  {
    title: "Shorthands",
    ApiKeys: APIData.shorthandsData,
  },
];

const topBorderRadius = ".5em .5em 0 0";
const bottomBorderRadius = "0 0 .5em .5em";

const AccordionPanel = (props: { APIKeyInfo: APIKeyData, firstChild: boolean, lastChild: boolean }) => {
  const routeQuery = useRouter().asPath.replace("/api-guide#", "");
  const { APIKeyInfo, firstChild, lastChild } = props;
  const defaultOpen = routeQuery === APIKeyInfo.key;
  const [isOpen, toggleOpen] = useState(defaultOpen);
  const [isHovered, toggleHover] = useState(false);
  const borderRadius = firstChild ? topBorderRadius : lastChild && !(isOpen) ? bottomBorderRadius : "0";

  return (
    <li key={`list-item-${APIKeyInfo.key}`} id={APIKeyInfo.key}>
      <div className="accordion-panel"
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      >
      <button onClick={() => toggleOpen(!isOpen)}>{APIKeyInfo.key}</button>
      <div className="accordion-panel-content">
        <p>{APIKeyInfo.description}</p>
        <br />
        <CodeSample sample={APIKeyInfo.codeSample} />
      </div>
      </div>
      <style jsx>{`
        .accordion-panel button {
          font-size: 1.2em;
          color: #fff;
          cursor: pointer;
          padding: 10px;
          padding-top: 14px;
          width: 100%;
          text-align: center;
          border: none;
          border-bottom: ${!(lastChild) && !(isOpen) ? `1px solid ${backgroundHover}` : "none"};
          outline: none;
        }
        .accordion-panel button {
          background-color: ${isHovered ? backgroundHover : backgroundColor};
          border-radius: ${borderRadius}
        }
        .accordion-panel-content {
          padding: 0 18px 8px;
          background-color: #fff;
        }
        .accordion-panel-content {
          display: ${isOpen ? "block" : "none"};
          border: 2px solid ${isHovered ? backgroundHover : backgroundColor};
          border-radius: ${lastChild && isOpen ? bottomBorderRadius : "0"}
        }
      `}</style>
    </li>
  );
};

const AccordionSection = (props: { section: APISection }) => {
  const [showPanels, togglePanels] = useState(true); 
  const {section} = props; 

  return (
    <section key={`section-${section.title}`} id={section.title.toLowerCase().replace(" ", "-")} className="api-section">
      <div className="section-title-container">
      <div className="section-title" onClick={() => togglePanels(!showPanels)}>
        <FaSortDown style={{color: "#fff"}} />
          <h2>{section.title}</h2>
          <FaSortDown style={{transform: `${showPanels ? "none" : "rotate(180deg)"}`, paddingBottom: `${showPanels ? "5px" : "none"}`}}/>
      </div>
      </div>
        
        
        <ul>
          {section.ApiKeys.map((x, i) => (
            <AccordionPanel APIKeyInfo={x} 
              firstChild={ i === 0} 
              lastChild={i === section.ApiKeys.length - 1}
              key={`accordion-${x.key}`} 
              />
          ))}
        </ul>
        <style jsx>{`
          .api-section {
            padding-left: 2em;
            padding-right: 2em; 
          }
          ul {
            padding: 0;
            list-style: none;
            display: ${showPanels ? "block" : "none"}
          }
          .section-title-container {
            display: flex;
            justify-content: center;
          }
          .section-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90%;
          }
          h2 {
            margin: 0;
          }
        `}</style>
      </section>
  )
}

const APIGuide = () => (
  <div>
    {APIGuideSections.map((section) => (
      <AccordionSection section={section} key={`${section.title}-key`}/>
    ))}
  </div>
);

const APIPage = () => {
  

  return (
    <Layout title="RXP API" pageTitle="API">
      <APIGuide />
    </Layout>
  );
}

export default APIPage;