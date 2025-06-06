export const IconReference = {
  'chart-line': 'lucide:chart-line',
  'close': 'iconamoon:close-bold',
  'dashboard': 'akar-icons:dashboard',
  'eye': 'tabler:eye',
  'eye-off': 'tabler:eye-off',
  'filter': 'tabler:filter',
  'heart-hand': 'mingcute:heart-hand-line',
  'chevron-up': 'ph:caret-up-bold',
  'chevron-right': 'ic:round-chevron-right',
  'chevron-down': 'ph:caret-down-bold',
  'exit': 'uil:exit',
  'file-list': 'ri:file-list-2-line',
  'loading-fill': 'mingcute:loading-3-fill',
  'menu': 'cuida:menu-outline',
  'preferences': 'pajamas:preferences',
  'scheduler': 'lucide:book-marked',
  'search': 'stash:search-solid',
} as const;

export type IconKey = keyof typeof IconReference;
