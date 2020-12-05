import Layout from "../components/Layout";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { APIKeyData, APIData } from "../utils/APIData";
import { CodeSample } from "../components/CodeSample";
import { useOpenTabsContext, OpenTabsProvider } from "../context/OpenTabsContext";
import theme from "../styles/theme";

import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";



const backgroundColor = theme.colors.background;
const backgroundHover = theme.colors.backgroundHover;

const {
  RXPUnitData,
  step1Data,
  step2Data,
  step3Data,
  step4Data,
  presetsData,
  shorthandsData
} = APIData;

const SubSectionDivider = (props: {title: string, subSectionKeys: string[]}) => {
  const { title, subSectionKeys } = props;
  const { openTabs, addTabs, removeTabs } = useOpenTabsContext();
  const allKeysOpen = subSectionKeys.every(key => openTabs.includes(key));

  return (
    <div className="outer">
      <div 
        className="inner"
        onClick={allKeysOpen ? 
          () => removeTabs(subSectionKeys) 
          : () => addTabs(subSectionKeys)}
      >
      <p>{title}</p>
    </div>
      <style jsx>{`
      .outer {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .outer:hover {

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
        cursor: pointer;
      }
      .inner:hover {
        background: linear-gradient(180deg, 
          rgba(0,0,0,0) calc(50% - 1px), 
          ${theme.colors.background} calc(50%), 
          rgba(0,0,0,0) calc(50% + 1px)
          );
        color: ${theme.colors.background};
      }
      p {
        margin: auto;
        padding: 0 1em;
        background-color: #fff;
      }
      `}</style>
    </div>
  );
}

interface APISection {
  title: string;
  content: APIKeyData[];
  withSubHeaders: false;
  sectionKeys: string[]
}

interface SubHeaderData {
  subHeader: string; 
  subHeaderContent: APIKeyData[];
  subHeaderKeys: string[];
}

interface APISectionWithHeaders {
  title: string;
  content: SubHeaderData[];
  withSubHeaders: true;
  sectionKeys: string[]
}


const APIGuideSections: (APISection | APISectionWithHeaders)[] = [
  {
    title: "RXP Constructor",
    content: RXPUnitData,
    withSubHeaders: false,
    sectionKeys: RXPUnitData.map(data => data.key)
  },
  {
    title: "RXP Methods",
    content: [
      {
        subHeader: "Set Frequency",
        subHeaderContent: step1Data,
        subHeaderKeys: step1Data.map(data => data.key)
      },
      {
        subHeader: "Set Surroundings",
        subHeaderContent: step2Data,
        subHeaderKeys: step2Data.map(data => data.key)
      },
      {
        subHeader: "Set Positioning",
        subHeaderContent: step3Data,
        subHeaderKeys: step3Data.map(data => data.key)
      },
      {
        subHeader: "Set Options",
        subHeaderContent: step4Data,
        subHeaderKeys: step4Data.map(data => data.key)
      }
    ],
    withSubHeaders: true,
    sectionKeys: [
      ...step1Data,
      ...step2Data,
      ...step3Data,
      ...step4Data
    ].map(data => data.key)
  },
  {
    title: "Presets",
    content: presetsData,
    withSubHeaders: false,
    sectionKeys: presetsData.map(data => data.key)
  },
  {
    title: "Shorthands",
    content: shorthandsData,
    withSubHeaders: false,
    sectionKeys: shorthandsData.map(data => data.key)
  },
];

const topBorderRadius = ".5em .5em 0 0";
const bottomBorderRadius = "0 0 .5em .5em";

const AccordionPanel = (props: { APIKeyInfo: APIKeyData, firstChild: boolean, lastChild: boolean }) => {
  const { APIKeyInfo, firstChild, lastChild } = props;
  const { openTabs, addTabs, removeTabs } = useOpenTabsContext();
  const isOpen = openTabs.includes(props.APIKeyInfo.key);
  const toggleOpen = isOpen ? () => removeTabs([props.APIKeyInfo.key]) : () => addTabs([props.APIKeyInfo.key])
  
  const [isHovered, toggleHover] = useState(false);
  const borderRadius = firstChild ? topBorderRadius : lastChild && !(isOpen) ? bottomBorderRadius : "0";

  return (
    <li key={`list-item-${APIKeyInfo.key}`} id={APIKeyInfo.key}>
      <div className="accordion-panel sticky-header-adjust"
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
      >
      <button onClick={() => toggleOpen()}>{APIKeyInfo.key}</button>
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

const AccordionPanelGroup = (props: {APIKeys: APIKeyData[] }) => (
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
          `}</style>
        </ul>
);

const AccordionSection = (props: { section: APISection | APISectionWithHeaders, lastSection: boolean }) => {
  const { section } = props;
  const { title, sectionKeys } = section; 
  const { openTabs, addTabs, removeTabs } = useOpenTabsContext();
  const openAllSectionTabs = () => addTabs(sectionKeys);
  const closeAllSectionTabs = () => removeTabs(sectionKeys)
  const allKeysOpen = sectionKeys.every(key => openTabs.includes(key));

  const [isHovered, toggleHover] = useState(false);

  return (
    <section key={`section-${title}`} id={title.toLowerCase().replace(" ", "-")} className="api-section sticky-header-adjust">
      <div className="section-title-container">
      <div className="section-title" >
        <FaPlusSquare style={{color: "#fff"}} />
          <h2 
            onClick={allKeysOpen ? () => closeAllSectionTabs() : () => openAllSectionTabs()}
            onMouseEnter={() => toggleHover(true)}
            onMouseLeave={() => toggleHover(false)}
            >
            { title }
          </h2>
          {allKeysOpen ? 
          <span className="section-icon">
            <FaMinusSquare 
            onClick={allKeysOpen ? () => closeAllSectionTabs() : () => openAllSectionTabs()}
              onMouseEnter={() => toggleHover(true)}
              onMouseLeave={() => toggleHover(false)}
              />
          </span>
             
            : <span className="section-icon">
              <FaPlusSquare 
            onClick={allKeysOpen ? () => closeAllSectionTabs() : () => openAllSectionTabs()}
                onMouseEnter={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
              />
              </span>}
          {/*<FaPlusSquare style={{transform: `${allKeysOpen ? "rotate(180deg)" : "none" }`, paddingBottom: `${allKeysOpen ? "none" : "5px"}`}}/>*/}
      </div>
      </div>
        {section.withSubHeaders ? section.content.map(subSection => (
            <div key={`subHeader-section-${subSection.subHeader}`}>
              <SubSectionDivider title={subSection.subHeader} subSectionKeys={subSection.subHeaderKeys}/>
              <AccordionPanelGroup APIKeys={subSection.subHeaderContent} />
            </div>
          )) : (<AccordionPanelGroup APIKeys={section.content} />)}
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
            cursor: pointer;
          }
          h2 {
            color: ${isHovered ? backgroundColor : undefined};
          }
          .section-icon {
            cursor: pointer;
          }
          .section-icon {
            color: ${isHovered ? backgroundColor : undefined};
          }
        `}</style>
      </section>
  )
}

const APIGuide = () => {
  

  return (
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
}

const APIPage = () => {
  const routeQuery = useRouter().asPath.replace("/api-guide#", "");

  return (
    <Layout title="API Guide" pageTitle="API Guide" sizing="modest">
      <OpenTabsProvider defaultOpen={routeQuery}>
        <APIGuide />
      </OpenTabsProvider>
    </Layout>
  );
}

export default APIPage;