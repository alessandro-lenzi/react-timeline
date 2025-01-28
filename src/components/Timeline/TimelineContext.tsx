import { createContext, ReactNode, useContext, useState } from 'react';

export interface Section {
  id: number;
  title: string;
}

interface TimelineContextType {
  sections: Section[];
  registerSection: (section: Section) => void;
  activeSection: number;
  setActiveSection: (sectionId: number) => void;
}

interface TimelineContextProviderProps {
  children: ReactNode;
}

const TimelineContext = createContext<TimelineContextType>({
  sections: [],
  registerSection: () => {},
  activeSection: 0,
  setActiveSection: () => {},
});

export const TimelineContextProvider = ({
  children,
}: TimelineContextProviderProps) => {
  const [activeSection, setActiveSection] = useState(-1);
  const [sections, setSections] = useState<Section[]>([]);

  const registerSection = (section: Section) => {
    setSections((val) => val.concat(section));
  };

  const prepareSections = (values: Section[]) => {
    const ids = values.map(({ id }) => id);
    const uniqueSections = values.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );
    return uniqueSections;
  };

  return (
    <TimelineContext.Provider
      value={{
        sections: prepareSections(sections),
        registerSection,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTimelineContext = () => {
  return useContext(TimelineContext);
};
