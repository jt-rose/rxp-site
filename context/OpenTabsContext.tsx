import React, { createContext, useContext, useState, ReactNode } from "react";

interface OpenTabsContextType {
    openTabs: string[];
    addTabs: (tabs: string[]) => void;
    removeTabs: (tabs: string[]) => void;
  }
  const OpenTabsContext = createContext<OpenTabsContextType>({
    openTabs: [],
    addTabs: () => {},
    removeTabs: () => {}
  });
  
  export const OpenTabsProvider = (props: {children: ReactNode, defaultOpen: string}) => {
    const [openTabs, updateOpenTabs] = useState([props.defaultOpen]);
    const addTabs = (tabs: string[]) => {
      const updatedOpenTabs = [...tabs, ...openTabs];
      updateOpenTabs(updatedOpenTabs)
    }
    const removeTabs = (tabs: string[]) => {
      const filteredTabs = openTabs.filter(tab => !(tabs.includes(tab)));
      updateOpenTabs(filteredTabs);
    }
    return (
      <OpenTabsContext.Provider value={{
        openTabs,
        addTabs,
        removeTabs
      }}>
        {props.children}
      </OpenTabsContext.Provider>
    )
  };

  export const useOpenTabsContext = () => useContext(OpenTabsContext);