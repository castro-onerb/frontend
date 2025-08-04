export const SchedulerColorsStatusType = {
  Red: 'red',
  Purple: 'purple',
  Pink: 'pink',
  Emerald: 'emerald',
  Slate: 'slate',
  Orange: 'orange',
} as const;

export type EventColorStatus = (typeof SchedulerColorsStatusType)[keyof typeof SchedulerColorsStatusType];