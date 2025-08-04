export const CardType = {
  Red: 'red',
  Purple: 'purple',
  Pink: 'pink',
  Emerald: 'emerald',
  Slate: 'slate',
} as const;

export type CardType = (typeof CardType)[keyof typeof CardType];
