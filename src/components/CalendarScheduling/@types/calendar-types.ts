// calendar-types.ts
export const CardType = {
  Red: 'red',
  Purple: 'purple',
  Pink: 'pink',
  Emerald: 'emerald',
} as const;

export type CardType = (typeof CardType)[keyof typeof CardType];
