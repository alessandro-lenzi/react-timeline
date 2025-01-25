import { LoremIpsum } from 'lorem-ipsum'

import './App.css'
import ThemeSwitch from './components/ThemeSwitch'
import { Timeline } from './components/Timeline'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

const breakLines = (str: string) =>
  str.split('\n').map((subStr, index) => {
    return <p key={index}>{subStr}</p>
  })

function App() {
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>@alessandrolenzi/react-timeline</h1>
        <div className="self-end">
          <ThemeSwitch />
        </div>
      </div>
      <main className="max-w-[1024px] p-10">
        <Timeline
          renderDetail={(entry) => (
            <div className="flex flex-1 flex-col gap-2 rounded-md p-6">
              <div className="font-bold">{entry.detail}</div>
            </div>
          )}
          data={[
            {
              date: new Date(2024, 5, 1),
              // icon: string | ReactNode
              title: '2. My second row',
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2024, 5, 2),
              // icon: string | ReactNode
              title: '1. My first row at the top',
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2023, 5, 4),
              // icon: string | ReactNode
              title: '3. My third row',
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2023, 5, 2),
              // icon: string | ReactNode
              title: `5. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2023, 5, 3),
              // icon: string | ReactNode
              title: `4. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2022, 5, 1),
              // icon: string | ReactNode
              title: `8. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2022, 5, 2),
              // icon: string | ReactNode
              title: `7. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2022, 5, 3),
              // icon: string | ReactNode
              title: `6. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2021, 5, 1),
              // icon: string | ReactNode
              title: `12. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2021, 5, 2),
              // icon: string | ReactNode
              title: `11. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2021, 5, 3),
              // icon: string | ReactNode
              title: `10. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2021, 5, 4),
              // icon: string | ReactNode
              title: `9. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
          ]}
        />
      </main>
    </>
  )
}

export default App
