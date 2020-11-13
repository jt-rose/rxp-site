import Layout from "../components/Layout";

import React, { useState } from "react";
import { APIKeyData, APIData } from "../utils/APIData";
import { CodeSample } from "../utils/CodeSample";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

const APIPage = () => (
  <Layout title="RXP API">
    <h1>API</h1>
    <APIGuide />
  </Layout>
);

export default APIPage;

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

const topBorderRadius = "1em 1em 0 0";
const bottomBorderRadius = "0 0 1em 1em";

const AccordionPanel = (props: { APIKeyInfo: APIKeyData, firstChild: boolean, lastChild: boolean }) => {
  const [isOpen, toggleOpen] = useState(false);
  const [isHovered, toggleHover] = useState(false);
  const { APIKeyInfo, firstChild, lastChild } = props;
  const borderRadius = firstChild ? topBorderRadius : lastChild && !(isOpen) ? bottomBorderRadius : "0";

  return (
    <li key={`list-item-${APIKeyInfo.key}`}>
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
          color: #444;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          text-align: center;
          border: none;
          outline: none;
        }
        .accordion-panel button {
          background-color: ${isHovered ? "#ccc" : "#eee"};
          border-radius: ${borderRadius}
        }
        .accordion-panel-content {
          padding: 0 18px;
          background-color: white;
        }
        .accordion-panel-content {
          display: ${isOpen ? "block" : "none"};
          border: 2px solid ${isHovered ? "#ccc" : "#eee"};
          border-radius: ${lastChild && isOpen ? bottomBorderRadius : "0"}
        }
      `}</style>
    </li>
  );
};

const AccordionSection = (props: { section: APISection}) => {
  const [showPanels, togglePanels] = useState(true); 
  const {section} = props; 

  return (
    <section key={`section-${section.title}`} id={section.title.toLowerCase().replace(" ", "-")} className="api-section">
      <div className="section-title-container">
      <div className="section-title" onClick={() => togglePanels(!showPanels)}>
          <h3>{section.title}</h3>
          <div className="icon-holder" >
            <FontAwesomeIcon icon={faSortDown} size={"lg"} transform={showPanels ? {rotate: 180} : undefined}/>
          </div>
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
            width: 50%;
          }
          .section-title:hover {
            background-color: #eee;
          }
          .icon-holder {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}</style>
      </section>
  )
}

const APIGuide = () => (
  <div>
    {APIGuideSections.map((section) => (
      <AccordionSection section={section} />
    ))}
  </div>
);
