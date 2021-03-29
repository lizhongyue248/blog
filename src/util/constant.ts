export const colors = [
  'red',
  'amber',
  'teal',
  'orange',
  'yellow',
  'green',
  'emerald',
  'rose',
  'lime',
  'blue',
  'fuchsia',
  'violet',
  'cyan',
  'indigo',
  'purple',
  'lightBlue',
  'pink'
]

export const getColor = (index: number): string => colors[index % colors.length]
