import { RefObject } from 'react';

import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'motion/react';

import { useTimelineContext } from './TimelineContext';

export const TableOfContents = ({
  containerRef,
}: {
  containerRef?: RefObject<HTMLElement | null>;
}) => {
  const { sections, activeSection } = useTimelineContext();

  const { scrollYProgress } = useScroll({
    // container: containerRef,
    target: containerRef,
    layoutEffect: false,
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  console.log(`toc progress = ${progressHeight.get()}`);

  return (
    <div className="px-4">
      <div className="sticky top-10 flex gap-4">
        <div className="w-0.5 overflow-hidden rounded-full bg-neutral-300">
          <motion.div
            className="w-full origin-top bg-neutral-800"
            style={{ height: progressHeight }}
          />
        </div>
        <div className="hidden flex-col gap-4 text-sm lg:flex xl:text-base">
          {sections.map(({ id, title }) => (
            <span
              key={id}
              className={clsx('cursor-pointer transition-colors duration-200', {
                'text-neutral-300': activeSection === id,
                'text-neutral-600': activeSection !== id,
              })}
              onClick={() => {
                document
                  .getElementById(`timeline-section-${id}`)
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
