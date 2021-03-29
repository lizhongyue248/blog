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

export const isBrowser = (): boolean => typeof window !== 'undefined'

export const randomColor = (): string => {
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
  return `hsl(${randomInt(0, 360)}, ${randomInt(42, 98)}%, ${randomInt(40, 90)}%)`
}

export const getMonth = (date: Date) : string => {
  const month = date.getMonth()
  return month < 10 ? `0${month}` : `${month}`
}
