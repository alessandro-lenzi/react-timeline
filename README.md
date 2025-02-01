# @alessandro-lenzi/react-timeline

A vertical timeline with dynamic table of contents, for React.js, with motion animations.

Warning: This is a work in progress and it's not perfect ;P.

## Sample:
![image](https://github.com/user-attachments/assets/3f23422a-d94c-491e-935e-158eb2cabeaf)

## Installation:

```
npm i @alessandro-lenzi/react-timeline
```

## Basic component structure:

```ts
import { Timeline } from '@alessandro-lenzi/react-timeline';

<Timeline
  entries={[
    {
      date: string | Date;
      ...
    }
  ]}
/>
```

## Parameters:

| Parameter | Type | Default  | Required |  Description |
| ---- | ---- | ---- | ---- | ---- |
| `entries`        | TimelineEntry                       | Default   | Required  | List of chronological entries for the timeline. See TimelineEntry specs below.   |
| `renderContent`  | (entry: TimelineEntry) => ReactNode |           | Optional  | Function to render each entry row on the timeline.    |
| `mode`           | 'single' \| 'split'                 | 'split'   | Optional  | Function to render each entry row on the timeline.    | 
| `align`          | 'center' \| 'left' \| 'right'       | 'center'  | Optional  | Place where the vertical bar will appear. Note the 'center' is only available when mode == 'split'.   |
| `renderDetail`   | (entry: TimelineEntry) => ReactNode |           | Required when 'split' mode  | Function to render each entry's row detail (second column content). Required when mode == 'split'.  |

## Entry properties: TimelineEntry\<T\>

| Parameter | Type | Default  | Required |  Description |
| ---- | ---- | ---- | ---- | ---- |
| `date`        | `Date \| string`       |           | Required  | Date value used for chronological sorting.    |
| `icon`        | `string \| ReactNode`  |           | Optional  | Icon to be used for this entry.    |
| `title`       | `string`               |           | Optional  | Entry title. (Optional so you can use your custom `renderContent`)   |
| `description` | `string`               |           | Optional  | Entry description. (Optional so you can use your custom `renderContent`)   |
| `[string]`    | `any`                  |           | Optional  | You can add any other fields, so they can be used on your custom `renderContent` and `renderDetail`   |

So, in case you have custom fields such as `detail: string` and a `bigDescription: string`, you can define as follow:
```ts
interface MyCustomFields {
  detail: string;
  bigDescription: string;
}
const myentries: TimelineEntry<MyCustomFields> = [
  {
    date: '2025-01-01',
    ...,
    detail: 'My detail data here',
    bigDescription: 'My big description here',
  },
  ...
]
```

## Usage example:

Dual column with bar in the middle:
```ts
        <Timeline
          renderDetail={(entry) => (
            <div className="flex flex-1 flex-col gap-2 rounded-md p-6">
              <div className="font-bold">{entry.detail}</div>
            </div>
          )}
          entries={[
            {
              date: new Date(2024, 5, 1),
              title: '2. My second row',
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2024, 5, 2),
              title: '1. My first row at the top',
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2023, 5, 4),
              title: '3. My third row',
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2023, 5, 2),
              title: `5. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2023, 5, 3),
              title: `4. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2022, 5, 1),
              title: `8. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2022, 5, 2),
              title: `7. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2022, 5, 3),
              title: `6. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2021, 5, 1),
              title: `12. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2021, 5, 2),
              title: `11. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2021, 5, 3),
              title: `10. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
            {
              date: new Date(2021, 5, 4),
              title: `9. ${lorem.generateSentences(1)}`,
              description: breakLines(lorem.generateParagraphs(1)),
              detail: breakLines(lorem.generateSentences(2)),
            },
          ]}
        />
```

