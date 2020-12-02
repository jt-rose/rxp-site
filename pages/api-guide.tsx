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
  step3Data,
  step4Data,
} = APIData;

const MethodSectionDivider = (props: {title: string}) => (
  <div className="outer">
    <div className="inner">
    <p>{props.title}</p>
  </div>
    <style jsx>{`
    .outer {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .inner {
      width: 300px;
      display: flex;
      justify-content: center;
      background: linear-gradient(180deg, 
      rgba(0,0,0,0) calc(50% - 1px), 
      rgba(192,192,192,1) calc(50%), 
      rgba(0,0,0,0) calc(50% + 1px)
      );
    }
    p {
      margin: auto;
      padding: 0 1em;
      background-color: #fff;
    }
    `}</style>
  </div>
);

interface APISection {
  title: string;
  content: APIKeyData[];
  subHeaders: false;
}

interface SubHeaderData {
  subHeader: string; 
  content: APIKeyData[];
}

interface APISectionWithHeaders {
  title: string;
  content: SubHeaderData[];
  subHeaders: true;
}


const APIGuideSections: (APISection | APISectionWithHeaders)[] = [
  {
    title: "RXP Constructor",
    content: APIData.RXPUnitData,
    subHeaders: false
  },
  {
    title: "RXP Methods",
    content: [
      {
        subHeader: "Set Frequency",
        content: step1Data
      },
      {
        subHeader: "Set Surroundings",
        content: step2Data
      },
      {
        subHeader: "Set Positioning",
        content: step3Data
      },
      {
        subHeader: "Set Options",
        content: step4Data
      }
    ],
    subHeaders: true
  },
  {
    title: "Presets",
    content: APIData.presetsData,
    subHeaders: false
  },
  {
    title: "Shorthands",
    content: APIData.shorthandsData,
    subHeaders: false
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
      <div className="accordion-panel sticky-header-adjust"
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      >
      <button onClick={() => toggleOpen(!isOpen)}>{APIKeyInfo.key}</button>
      <div className="accordion-panel-content">
        {APIKeyInfo.description}
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

const AccordionPanelGroup = (props: {APIKeys: APIKeyData[], showPanels: boolean}) => (
  <ul>
          {props.APIKeys.map((x, i) => (
            <AccordionPanel APIKeyInfo={x} 
              firstChild={ i === 0} 
              lastChild={i === props.APIKeys.length - 1}
              key={`accordion-${x.key}`} 
              />
          ))}
          <style jsx>{`
          ul {
            padding: 0;
            list-style: none;
          }
          ul {
            display: ${props.showPanels ? "block" : "none"}
          }
          `}</style>
        </ul>
);

const AccordionSection = (props: { section: APISection | APISectionWithHeaders, lastSection: boolean }) => {
  const [showPanels, togglePanels] = useState(true); 
  const {section} = props; 

  return (
    <section key={`section-${section.title}`} id={section.title.toLowerCase().replace(" ", "-")} className="api-section sticky-header-adjust">
      <div className="section-title-container">
      <div className="section-title" onClick={() => togglePanels(!showPanels)}>
        <FaSortDown style={{color: "#fff"}} />
          <h2>{section.title}</h2>
          <FaSortDown style={{transform: `${showPanels ? "none" : "rotate(180deg)"}`, paddingBottom: `${showPanels ? "5px" : "none"}`}}/>
      </div>
      </div>
        {section.subHeaders ? section.content.map(keys => (
            <div key={`subHeader-section-${keys.subHeader}`}>
              <MethodSectionDivider title={keys.subHeader}/>
              <AccordionPanelGroup APIKeys={keys.content} showPanels={showPanels}/>
            </div>
          )) : (<AccordionPanelGroup APIKeys={section.content} showPanels={showPanels}/>)}
        <style jsx>{`
          .api-section {
            padding-left: 2em;
            padding-right: 2em;
            margin-bottom: ${props.lastSection ? "2em" : "3em"};
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
    {APIGuideSections.map((section, i) => (
      <AccordionSection 
        section={section} 
        key={`${section.title}-key`}
        lastSection={APIGuideSections.length === (i + 1)}  
      />
    ))}
  </div>
);

const APIPage = () => {
  

  return (
    <Layout title="API Guide" pageTitle="API Guide" sizing="modest">
      <APIGuide />
    </Layout>
  );
}

export default APIPage;