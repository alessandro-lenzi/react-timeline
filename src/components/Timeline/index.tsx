import { ReactNode } from 'react'

import clsx from 'clsx'
import { motion, Variants } from 'motion/react'

import './styles.css'

export interface BaseEntry {
  date: string | Date
  icon?: string | ReactNode
  title?: string
  description?: string | ReactNode
}

export type TimelineEntry<T extends object> = BaseEntry & T

// type TimelineTree = Record<string, TimelineEntry[]>
type TimelineTree<T extends object> = {
  name: string
  entries: TimelineEntry<T>[]
}[]

export interface TimelineProps<T extends object> {
  data: TimelineEntry<T>[]
  renderContent?: (entry: TimelineEntry<T>) => ReactNode
  renderDetail?: (entry: TimelineEntry<T>) => ReactNode
}

// interface IOptions {
//   // groupColor: string
//   // lineColor: string
//   //barWidth: string
//   // bulletColor: string
//   // bulletSize: string
//   drawBorders: boolean
//   columnMode?: 'dual' | 'single'
//   position?: 'left' | 'center' | 'right'
// }

export function Timeline<T extends object>({
  data,
  renderContent,
  renderDetail,
}: TimelineProps<T>) {
  const sortedData = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const tree = sortedData.reduce<TimelineTree<T>>(
    (acc: TimelineTree<T>, entry: TimelineEntry<T>) => {
      const group = new Date(entry.date).getFullYear().toString()
      const groupIndex = acc.findIndex((val) => val.name === group)

      if (groupIndex < 0) {
        acc.push({
          name: group,
          entries: [entry],
        })
      } else {
        acc[groupIndex].entries.push(entry)
      }
      return acc
    },
    []
  )

  // const options: IOptions = {
  //   // lineColor: '#747b97',
  //   // barWidth: '2px',
  //   // groupColor: '#333',
  //   // bulletColor: '#999999',
  //   // bulletSize: '12px',
  //   drawBorders: false,
  //   columnMode: 'dual',
  //   position: 'center',
  // }

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
  }

  // const staggered: Transition = {
  //   // duration: 0.8,
  //   delay: 0.5,
  //   // ease: [0, 0.71, 0.2, 1.01],
  //   delayChildren: 1,
  //   staggerChildren: 0.5,
  //   // when: 'beforeChildren',
  // }

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
  }

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
  }
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
  }

  return (
    <div className="relative py-4">
      {/* <div className="absolute bottom-0 top-0 flex w-[4rem] flex-col items-center">
        <div
          className="flex-1"
          style={{
            backgroundColor: options.lineColor,
            width: options.lineWidth,
          }}
        ></div>
      </div> */}
      <motion.div
        // key="t"
        className="flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tree.map((group, groupIndex) => (
          <div key={group.name}>
            {/* { Group row } */}
            <motion.div
              className="relative flex flex-row justify-center"
              variants={childVariants}
            >
              {/* Middle column/line */}
              <div className="absolute bottom-0 top-0 flex w-[4rem] flex-col items-center">
                <div
                  className={clsx('timeline-bar flex-1', {
                    hidden: groupIndex === 0,
                  })}
                ></div>
                <div className={clsx('timeline-bar flex-1')}></div>
              </div>

              {/* { Group label} */}
              {/* <motion.div className="relative flex w-[4rem] flex-row items-center justify-center"> */}
              <motion.div className="relative flex flex-row items-center justify-center">
                <div
                  className="timeline-group-label"
                  style={
                    {
                      // width: options.bulletSize,
                      // height: options.bulletSize,
                      // backgroundColor: options.groupColor,
                    }
                  }
                >
                  {group.name}
                </div>
              </motion.div>
            </motion.div>

            {/* { Group entries } */}
            {group.entries.map((entry, index) => (
              <motion.div
                key={new Date(entry.date).getTime()}
                className="relative flex flex-row gap-[4rem]"
                variants={childVariants}
                style={{
                  perspective: '1000px',
                  transformOrigin: 'center left',
                  transformStyle: 'preserve-3d',
                }}
                initial="hidden"
                whileInView="visible"
              >
                {/* <div className="absolute bottom-0 top-0 flex w-[4rem] flex-col items-center"> */}
                {/* Middle column/line */}
                <div className="absolute inset-0 top-0 flex flex-col items-center">
                  <div className={clsx('timeline-bar flex-1')}></div>
                  <div
                    className={clsx('timeline-bar flex-1', {
                      hidden: index === sortedData.length - 1,
                    })}
                  ></div>
                </div>

                {/* <motion.div className="relative flex w-[4rem] flex-row items-center justify-center"> */}
                {/* Row bullet */}
                <motion.div className="absolute inset-0 flex flex-row items-center justify-center">
                  {entry.icon ? (
                    entry.icon
                  ) : (
                    <div className="timeline-bullet"></div>
                  )}
                </motion.div>

                {/* Row left */}
                <motion.div
                  className="my-2 flex flex-1 flex-col p-2"
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
                      // initial={{
                      //   translateY: '0',
                      //   // boxShadow: '0',
                      // }}
                      whileHover={{
                        // translateY: '-10px',
                        scale: 1.05,
                        boxShadow: '0 10px 10px #00000066',
                        // transition: { ease: 'easeIn', duration: 0.15 },
                      }}
                    >
                      {entry.title && (
                        <div className="font-bold">{entry.title}</div>
                      )}
                      {entry.description ? (
                        <div className="text-[0.8em]">{entry.description}</div>
                      ) : null}
                    </motion.div>
                  )}
                </motion.div>

                {/* Row right */}
                <motion.div
                  className="flex flex-1 flex-col p-2"
                  style={{ transformOrigin: 'center left' }}
                  variants={subVariantRight}
                >
                  {renderDetail ? renderDetail(entry) : null}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
