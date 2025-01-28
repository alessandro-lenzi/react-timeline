import { HTMLProps, useEffect, useRef } from 'react';

import { useScroll } from 'motion/react';

import { useTimelineContext } from './TimelineContext';

export const TrackedSection = ({
  sectionId,
  title,
  isFirst = false,
  isLast = false,
  ...props
}: {
  isFirst?: boolean;
  isLast?: boolean;
  sectionId: number;
  title: string;
} & HTMLProps<HTMLElement>) => {
  const { registerSection, setActiveSection } = useTimelineContext();

  useEffect(() => {
    registerSection({ id: sectionId, title });
  }, []);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  scrollYProgress.on('change', (value) => {
    if (value > 0 && value < 1) {
      setActiveSection(sectionId);
    }
    if ((value <= 0 && isFirst) || (value >= 1 && isLast)) {
      setActiveSection(-1);
    }
  });

  return (
    <section
      ref={container}
      id={`timeline-section-${sectionId}`}
      style={{ scrollMargin: '15vh' }}
      {...props}
    ></section>
  );
};
