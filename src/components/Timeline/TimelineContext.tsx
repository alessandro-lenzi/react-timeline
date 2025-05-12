import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface Section {
  id: number;
  title: string;
}

interface TimelineContextType {
  scrollOffset?: 'start' | 'center';
  sections: Section[];
  registerSection: (section: Section) => void;
  activeSection: number;
  setActiveSection: (sectionId: number) => void;
  debug: boolean;
}

interface TimelineContextProviderProps {
  debug?: boolean;
  children: ReactNode;
}

const TimelineContext = createContext<TimelineContextType>({
  scrollOffset: 'start',
  sections: [],
  registerSection: () => {},
  activeSection: 0,
  setActiveSection: () => {},
  debug: false,
});

export const TimelineContextProvider = ({
  debug = false,
  children,
}: TimelineContextProviderProps) => {
  const [scrollOffset] = useState<'start' | 'center' | undefined>('start');
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

  const value = useMemo(
    () => ({
      scrollOffset,
      sections: prepareSections(sections),
      registerSection,
      activeSection,
      setActiveSection,
      debug,
    }),
    [scrollOffset, sections, activeSection, debug]
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTimelineContext = () => {
  return useContext(TimelineContext);
};
