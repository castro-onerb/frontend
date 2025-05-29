export const IconReference = {
  'loading-fill': 'mingcute:loading-3-fill',
  'eye': 'tabler:eye',
  'eye-off': 'tabler:eye-off',
  'chart-line': 'lucide:chart-line',
} as const;

export type IconKey = keyof typeof IconReference;
