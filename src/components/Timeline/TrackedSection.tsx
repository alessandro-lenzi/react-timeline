import { ReactNode, useEffect, useRef, useState } from 'react';

import {
  HTMLMotionProps,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';

import { useTimelineContext } from './TimelineContext';

export const TrackedSection = ({
  sectionId,
  title,
  isFirst = false,
  isLast = false,
  children,
  ...props
}: {
  isFirst?: boolean;
  isLast?: boolean;
  sectionId: number;
  title: string;
  children?: ReactNode;
} & HTMLMotionProps<'div'>) => {
  const { registerSection, setActiveSection, debug } = useTimelineContext();
  const [valueY, setValueY] = useState(0);

  useEffect(() => {
    registerSection({ id: sectionId, title });
  }, []);

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start center', 'end center'],
    layoutEffect: true,
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (value > 0 && value < 1) {
      setActiveSection(sectionId);
    }
    if ((value <= 0 && isFirst) || (value >= 1 && isLast)) {
      setActiveSection(-1);
    }
    setValueY(value);
  });

  return (
    <>
      <motion.div
        ref={container}
        id={`timeline-section-${sectionId}`}
        style={{ scrollMargin: '15vh' }}
        {...props}
      >
        {debug && (
          <div
            className="fixed border border-green-500 bg-black/50"
            style={{ top: `${sectionId * 32}px`, left: '50px' }}
          >
            {sectionId} {title} - {valueY}
          </div>
        )}

        {children}
      </motion.div>
    </>
  );
};
