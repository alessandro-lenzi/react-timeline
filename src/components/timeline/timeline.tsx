import { ReactNode } from 'react'

import clsx from 'clsx'
import { motion, Variants } from 'motion/react'

export interface TimelineRow {
  date: Date
  title: string
  icon?: string | ReactNode
  content?: string | ReactNode
  detail?: string | ReactNode
}

// type TimelineTree = Record<string, TimelineRow[]>
type TimelineTree = {
  name: string
  rows: TimelineRow[]
}[]

export interface TimelineProps {
  data: TimelineRow[]
}

interface IOptions {
  groupColor: string
  lineColor: string
  lineWidth: string
  bulletColor: string
  bulletSize: string
  drawBorders: boolean
}

export function Timeline({ data }: TimelineProps) {
  const sortedData = data.sort((a, b) => b.date.getTime() - a.date.getTime())

  const tree = sortedData.reduce<TimelineTree>(
    (arr: TimelineTree, row: TimelineRow) => {
      const group = row.date.getFullYear().toString()
      const groupIndex = arr.findIndex((val) => val.name === group)

      if (groupIndex < 0) {
        arr.push({
          name: group,
          rows: [row],
        })
      } else {
        arr[groupIndex].rows.push(row)
      }
      return arr
    },
    []
  )

  const options: IOptions = {
    lineColor: '#374151',
    lineWidth: '2px',
    groupColor: '#333',
    bulletColor: '#999999',
    bulletSize: '12px',
    drawBorders: false,
  }

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
                  className="flex-1"
                  style={{
                    backgroundColor:
                      groupIndex > 0 ? options.lineColor : 'transparent',
                    width: options.lineWidth,
                  }}
                ></div>
                <div
                  className="flex-1"
                  style={{
                    backgroundColor: options.lineColor,
                    width: options.lineWidth,
                  }}
                ></div>
              </div>

              {/* { Group label} */}
              {/* <motion.div className="relative flex w-[4rem] flex-row items-center justify-center"> */}
              <motion.div className="relative flex flex-row items-center justify-center">
                <div
                  className="rounded-md border border-gray-700 bg-zinc-800 px-3 py-1"
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

            {/* { Group items rows } */}
            {group.rows.map((row, index) => (
              <motion.div
                key={row.date.getTime()}
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
                  <div
                    className="flex-1"
                    style={{
                      backgroundColor: options.lineColor,
                      width: options.lineWidth,
                    }}
                  ></div>
                  <div
                    className="flex-1"
                    style={{
                      backgroundColor:
                        index < sortedData.length - 1
                          ? options.lineColor
                          : 'transparent',
                      width: options.lineWidth,
                    }}
                  ></div>
                </div>

                {/* <motion.div className="relative flex w-[4rem] flex-row items-center justify-center"> */}
                {/* Row bullet */}
                <motion.div className="absolute inset-0 flex flex-row items-center justify-center">
                  {row.icon ? (
                    row.icon
                  ) : (
                    <div
                      className="rounded-full"
                      style={{
                        width: options.bulletSize,
                        height: options.bulletSize,
                        backgroundColor: options.bulletColor,
                      }}
                    ></div>
                  )}
                </motion.div>

                {/* Row left */}
                <motion.div
                  className="my-2 flex flex-1 flex-col p-2"
                  style={{ transformOrigin: 'center left' }}
                  variants={subVariantLeft}
                >
                  {/* head */}
                  <motion.div
                    className={clsx({
                      'flex flex-1 flex-col gap-2 p-4': true,
                      'shadow-md transition-shadow hover:shadow-white/15':
                        options.drawBorders,
                      'rounded-md border border-gray-700 bg-zinc-800':
                        options.drawBorders,
                    })}
                    whileHover={{
                      scale: 1.05,
                      shadow: '0 0 10px -1px #ffffff26',
                    }}
                  >
                    <div className="font-bold">{row.title}</div>
                    <div className="text-[0.8em]">{row.content}</div>
                  </motion.div>
                  {/* foot */}
                </motion.div>

                {/* Row right */}
                <motion.div
                  className="flex flex-1 flex-col p-2"
                  style={{ transformOrigin: 'center left' }}
                  variants={subVariantRight}
                >
                  {row.detail}
                  {/* <div className="flex flex-1 flex-col gap-2 rounded-md p-4">
                    <div className="font-bold">{row.title}</div>
                  </div> */}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
