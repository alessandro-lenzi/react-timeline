import { LoremIpsum } from 'lorem-ipsum'

import './App.css'
import { Timeline } from './components/timeline/timeline'

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
      <h1>@alessandrolenzi/react-timeline</h1>
      <main className="p-10">
        <Timeline
          data={[
            {
              date: new Date(2024, 5, 1),
              // icon: string | ReactNode
              title: 'My second row',
              content: breakLines(lorem.generateParagraphs(1)),
            },
            {
              date: new Date(2024, 5, 2),
              // icon: string | ReactNode
              title: 'My first row at the top',
              content: breakLines(lorem.generateParagraphs(1)),
            },
            {
              date: new Date(2023, 5, 1),
              // icon: string | ReactNode
              title: 'My third row',
              content: breakLines(lorem.generateParagraphs(1)),
            },
          ]}
        />
      </main>
    </>
  )
}

export default App
