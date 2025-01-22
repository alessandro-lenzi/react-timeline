import { ReactNode } from 'react'

import { motion, Variants } from 'motion/react'

export interface TimelineRow {
  date: Date
  title: string
  icon?: string | ReactNode
  content?: string | ReactNode
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
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.5,
        when: 'beforeChildren',
      },
    },
  }

  const childVariants: Variants = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
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
            <motion.div
              className="relative flex flex-row"
              variants={childVariants}
              // initial="hidden"
              // animate="visible"
            >
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

              <motion.div className="relative flex w-[4rem] flex-row items-center justify-center">
                <div
                  className="rounded-md px-3 py-1"
                  style={{
                    // width: options.bulletSize,
                    // height: options.bulletSize,
                    backgroundColor: options.groupColor,
                  }}
                >
                  {group.name}
                </div>
              </motion.div>
            </motion.div>
            {group.rows.map((row, index) => (
              <motion.div
                key={row.date.getTime()}
                className="relative flex flex-row"
                variants={childVariants}
                // initial="hidden"
                // animate="visible"
              >
                <div className="absolute bottom-0 top-0 flex w-[4rem] flex-col items-center">
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

                <motion.div className="relative flex w-[4rem] flex-row items-center justify-center">
                  <div
                    className="rounded-full"
                    style={{
                      width: options.bulletSize,
                      height: options.bulletSize,
                      backgroundColor: options.bulletColor,
                    }}
                  ></div>
                </motion.div>

                <motion.div className="flex flex-1 flex-col p-2">
                  {/* head */}
                  <div className="flex flex-1 flex-col gap-2 rounded-md border border-gray-700 p-4">
                    <div className="font-bold">{row.title}</div>
                    <div className="text-[0.8em]">{row.content}</div>
                  </div>
                  {/* foot */}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
