import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.tz.setDefault('Asia/Shanghai')

export default dayjs

export const formatTemplate = 'YYYY-MM-DD HH:mm:ss'

export const fromNow = (modified: string): duration.Duration =>
  dayjs.duration(dayjs().valueOf() - dayjs(modified).valueOf())

export const isDeprecated = (time: duration.Duration): boolean => time.asMonths() > 6
