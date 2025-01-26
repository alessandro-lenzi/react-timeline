import type { Meta, StoryObj } from '@storybook/react'

import { Timeline } from './'
import { mockData } from '../../../.storybook/mockData'

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Timeline<{ detail: string }>>

export const CenterAligned: Story = {
  args: {
    renderDetail: (entry) => (
      <div className="flex flex-1 flex-col gap-2 rounded-md p-6">
        <div className="font-bold">{entry.detail}</div>
      </div>
    ),
    data: mockData,
  },
}
CenterAligned.storyName = 'Dual Center'

export const LeftAligned: Story = {
  args: {
    renderDetail: (entry) => (
      <div className="flex flex-1 flex-col gap-2 rounded-md p-6">
        <div className="font-bold">{entry.detail}</div>
      </div>
    ),
    data: mockData,
    align: 'left',
  },
}
LeftAligned.storyName = 'Dual Left'

export const RightAligned: Story = {
  args: {
    renderDetail: (entry) => (
      <div className="flex flex-1 flex-col gap-2 rounded-md p-6">
        <div className="font-bold">{entry.detail}</div>
      </div>
    ),
    data: mockData,
    align: 'right',
  },
}
RightAligned.storyName = 'Dual Right'

export const SingleLeftAligned: Story = {
  args: {
    renderDetail: (entry) => (
      <div className="flex flex-1 flex-col gap-2 rounded-md p-6">
        <div className="font-bold">{entry.detail}</div>
      </div>
    ),
    data: mockData,
    mode: 'single',
    align: 'left',
  },
}
SingleLeftAligned.storyName = 'Single Left'

export const SingleRightAligned: Story = {
  args: {
    renderDetail: (entry) => (
      <div className="flex flex-1 flex-col gap-2 rounded-md p-6">
        <div className="font-bold">{entry.detail}</div>
      </div>
    ),
    data: mockData,
    mode: 'single',
    align: 'right',
  },
}
SingleRightAligned.storyName = 'Single Right'

export const SingleLeftAlignedNoDetail: Story = {
  args: {
    // renderDetail: (entry) => (
    //   <div className="flex flex-1 flex-col gap-2 rounded-md p-6">
    //     <div className="font-bold">{entry.detail}</div>
    //   </div>
    // ),
    data: mockData,
    mode: 'single',
    align: 'left',
  },
}
SingleLeftAlignedNoDetail.storyName = 'Single Left, no detail'
