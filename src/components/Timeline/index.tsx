import { HTMLProps, ReactNode, useRef } from 'react';

import clsx from 'clsx';
import { motion, Variants } from 'motion/react';

import { TableOfContents } from './TableOfContents';
import { TimelineContextProvider } from './TimelineContext';
import { TrackedSection } from './TrackedSection';

import './styles.css';

export interface BaseEntry {
  date: string | Date;
  icon?: string | ReactNode;
  title?: string;
  description?: string | ReactNode;
}

export type TimelineEntry<T> = BaseEntry & T;

type TimelineSections<T> = {
  name: string;
  entries: TimelineEntry<T>[];
}[];

interface SingleMode<T> {
  mode?: 'single';
  align?: 'left' | 'right';
  renderDetail?: (entry: TimelineEntry<T>) => ReactNode;
}
interface SplitMode<T> {
  mode?: 'split';
  align?: 'center' | 'left' | 'right';
  renderDetail: (entry: TimelineEntry<T>) => ReactNode;
}

export type TimelineProps<T> = {
  entries: TimelineEntry<T>[];
  renderContent?: (entry: TimelineEntry<T>) => ReactNode;
} & (SingleMode<T> | SplitMode<T>) &
  HTMLProps<HTMLDivElement>;

export function Timeline<T>({
  entries,
  renderContent,
  renderDetail,
  align = 'center',
  mode = 'split',
  ...props
}: TimelineProps<T>) {
  const sortedData = entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const sections = sortedData.reduce<TimelineSections<T>>(
    (acc: TimelineSections<T>, entry: TimelineEntry<T>) => {
      const section = new Date(entry.date).getFullYear().toString();
      const sectionIndex = acc.findIndex((val) => val.name === section);

      if (sectionIndex < 0) {
        acc.push({
          name: section,
          entries: [entry],
        });
      } else {
        acc[sectionIndex].entries.push(entry);
      }
      return acc;
    },
    []
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.5,
        // delayChildren: 1.5,
        when: 'beforeChildren',
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      transform: 'rotateY(20deg)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'scale(1) rotateY(0deg)',
      transition: {
        staggerChildren: 0.5,
        when: 'beforeChildren',
      },
    },
    hover: {
      // transform: 'scale(0.8) rotateY(20deg)',
      transform: 'rotateY(20deg)',
      filter: 'blur(5px)',
    },
  };

  const subVariantLeft: Variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      transform: 'translateX(-100px) rotateY(20deg)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'rotateY(0deg)',
    },
  };
  const subVariantRight: Variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      transform: 'translateX(100px) rotateY(20deg)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'rotateY(0deg)',
    },
  };

  const containerRef = useRef(null);

  return (
    <TimelineContextProvider>
      <div
        {...props}
        className={clsx(
          'relative grid grid-cols-[10%_1fr] grid-rows-[auto] py-4 lg:grid-cols-[15%_1fr]',
          props.className
        )}
      >
        <TableOfContents />
        <motion.article
          ref={containerRef}
          className="flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, sectionIndex) => (
            <TrackedSection
              key={section.name}
              sectionId={sectionIndex}
              title={section.name}
              isFirst={sectionIndex === 0}
              isLast={sectionIndex === sections.length - 1}
            >
              {/* { Group row } */}
              <motion.div
                className={clsx('relative flex flex-row', {
                  'justify-center': align === 'center',
                  'justify-start': align === 'left',
                  'justify-end': align === 'right',
                })}
                variants={childVariants}
              >
                {/* Middle column/line */}
                <div className="absolute bottom-0 top-0 flex w-[4rem] flex-col items-center">
                  <div
                    className={clsx('timeline-bar flex-1', {
                      hidden: sectionIndex === 0,
                    })}
                  ></div>
                  <div className={clsx('timeline-bar flex-1')}></div>
                </div>

                {/* { Group label} */}
                <motion.div className="relative flex flex-row items-center justify-center">
                  <div className="timeline-group-label">{section.name}</div>
                </motion.div>
              </motion.div>

              {/* { Group entries } */}
              {section.entries.map((entry, index) => (
                <motion.div
                  key={new Date(entry.date).getTime()}
                  className={clsx('relative flex', {
                    'gap-[4rem]': align === 'center',
                    'flex-row': mode === 'split',
                    'flex-col': mode === 'single',
                  })}
                  variants={childVariants}
                  style={{
                    perspective: '1000px',
                    transformOrigin: 'center left',
                    transformStyle: 'preserve-3d',
                  }}
                  initial="hidden"
                  whileInView="visible"
                >
                  {/* Timeline bar */}
                  <div
                    className={clsx(
                      'absolute top-0 flex flex-col items-center',
                      {
                        'inset-0': align === 'center',
                        'bottom-0 w-[4rem]': align === 'left',
                        'bottom-0 right-0 w-[4rem]': align === 'right',
                      }
                    )}
                  >
                    <div className={clsx('timeline-bar flex-[0.5]')}></div>
                    <div
                      className={clsx('timeline-bar flex-[0.5]', {
                        hidden:
                          sectionIndex === sections.length - 1 &&
                          index === section.entries.length - 1,
                      })}
                    ></div>
                  </div>

                  {/* Row bullet */}
                  <motion.div
                    className={clsx(
                      'absolute top-0 flex flex-row items-center justify-center',
                      {
                        'inset-0': align === 'center',
                        'bottom-0 w-[4rem]': align === 'left',
                        'bottom-0 right-0 w-[4rem]': align === 'right',
                      }
                    )}
                  >
                    {entry.icon ? (
                      entry.icon
                    ) : (
                      <div className="timeline-bullet"></div>
                    )}
                  </motion.div>

                  {/* Row left */}
                  <motion.div
                    className={clsx('flex flex-1 flex-col p-2', {
                      'ml-[4rem]': align === 'left',
                      'mr-[4rem]': align === 'right' && mode === 'single',
                      'my-2': mode === 'split',
                    })}
                    style={{ transformOrigin: 'center left' }}
                    variants={subVariantLeft}
                  >
                    {renderContent ? (
                      renderContent(entry)
                    ) : (
                      <motion.div
                        className={clsx({
                          'flex flex-1 cursor-default flex-col gap-2 p-4': true,
                          'shadow-md transition-shadow hover:shadow-black/15':
                            true,
                          'rounded-md border border-gray-700 bg-zinc-800': true,
                        })}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 10px 10px #00000066',
                        }}
                      >
                        {entry.title && (
                          <div className="font-bold">{entry.title}</div>
                        )}
                        {entry.description ? (
                          <div className="text-[0.8em]">
                            {entry.description}
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Row right */}
                  {renderDetail ? (
                    <motion.div
                      className={clsx('flex flex-1 flex-col p-2', {
                        'mr-[4rem]': align === 'right',
                        'ml-[4rem]': align === 'left' && mode === 'single',
                        'my-2': mode === 'split',
                        'mb-2': mode === 'single',
                      })}
                      style={{ transformOrigin: 'center left' }}
                      variants={subVariantRight}
                    >
                      {renderDetail ? renderDetail(entry) : null}
                    </motion.div>
                  ) : null}
                </motion.div>
              ))}
            </TrackedSection>
          ))}
        </motion.article>
      </div>
    </TimelineContextProvider>
  );
}
