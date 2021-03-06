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
  'sky',
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
  'bg-sky-500',
  'bg-pink-500'
]

export const textColors = [
  'text-red-500',
  'text-amber-500',
  'text-teal-500',
  'text-orange-500',
  'text-yellow-500',
  'text-green-500',
  'text-emerald-500',
  'text-rose-500',
  'text-lime-500',
  'text-blue-500',
  'text-fuchsia-500',
  'text-violet-500',
  'text-cyan-500',
  'text-indigo-500',
  'text-purple-500',
  'text-sky-500',
  'text-pink-500'
]
export const borderColors = [
  'border-red-500',
  'border-amber-500',
  'border-teal-500',
  'border-orange-500',
  'border-yellow-500',
  'border-green-500',
  'border-emerald-500',
  'border-rose-500',
  'border-lime-500',
  'border-blue-500',
  'border-fuchsia-500',
  'border-violet-500',
  'border-cyan-500',
  'border-indigo-500',
  'border-purple-500',
  'border-sky-500',
  'border-pink-500'
]

export const getColor = (index: number): string => colors[index % colors.length]

export const getBgColors = (index: number): string => bgColors[index % colors.length]

export const getTextColors = (index: number): string => textColors[index % colors.length]

export const getBorderColors = (index: number): string => borderColors[index % colors.length]

export const isBrowser = (): boolean => typeof window !== 'undefined'

export const randomColor = (): string => {
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
  return `hsl(${randomInt(0, 360)}, ${randomInt(42, 98)}%, ${randomInt(40, 90)}%)`
}

export const getMonth = (date: Date) : string => {
  const month = date.getMonth()
  return month < 10 ? `0${month}` : `${month}`
}

export const banner = [
  '/blog/bg/bg1.jpg',
  '/blog/bg/bg2.jpg',
  '/blog/bg/bg3.jpg',
  '/blog/bg/bg5.jpg',
  '/blog/bg/plief.jpg',
  '/blog/bg/62824816_p0.jpg',
  '/blog/bg/Sweet-space.png',
  '/blog/bg/Next Theme KDE Plasma Wallpaper Flat Version.png',
  '/blog/bg/Inspiration KDE Plasma Theme Wallapper Flat Light.png',
  '/blog/bg/01-wallpaper-tela.jpg',
  '/blog/bg/02-wallpaper-vimix.jpg',
  '/blog/bg/03-wallpaper-stylish.jpg',
  '/blog/bg/timg (3).jpeg',
  '/blog/bg/timg (2).jpeg',
  '/blog/bg/bg-start.jpeg'
]

export const cdn = 'https://resources.echocow.cn'

export const getBanner = (round = 1): string => `${cdn}${banner[Math.round(new Date().getTime() * round / 100000 % banner.length)]}`

export const toCdn = (path: string): string => cdn + path

export const requestOptions = {
  pollingInterval: 3000,
  pollingWhenHidden: false
}
