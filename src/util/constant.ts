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

export const bgColors = [
  'bg-red-500',
  'bg-amber-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-lime-500',
  'bg-blue-500',
  'bg-fuchsia-500',
  'bg-violet-500',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-lightBlue-500',
  'bg-pink-500'
]

export const getColor = (index: number): string => colors[index % colors.length]

export const getBgColors = (index: number): string => bgColors[index % colors.length]

export const isBrowser = (): boolean => typeof window !== 'undefined'

export const randomColor = (): string => {
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
  return `hsl(${randomInt(0, 360)}, ${randomInt(42, 98)}%, ${randomInt(40, 90)}%)`
}

export const getMonth = (date: Date) : string => {
  const month = date.getMonth()
  return month < 10 ? `0${month}` : `${month}`
}
