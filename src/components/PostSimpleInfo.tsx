import { FC, ReactElement } from 'react'
import { navigate } from 'gatsby'
import Visibility from '@material-ui/icons/Visibility'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CategoryIcon from '@material-ui/icons/Category'
import { EditSharp } from '@material-ui/icons'
import { salAttr } from './PostContent'
import dayjs, { formatTemplate } from '../util/dayjs'
import { PageView } from '../interface/site'
import { Node } from '../interface/asciidoc'

interface SimpleInfoProps {
  node: Node,
  className?: string,
  children?: ReactElement,
  view?: PageView,
  fromNow?: boolean,
  between?: boolean
}

const PostSimpleInfo: FC<SimpleInfoProps> = (
  {
    node,
    className,
    children,
    view = { count: 0, favorite: 0, hate: 0 },
    fromNow = false,
    between = true
  }): ReactElement => {
  const { fields, pageAttributes } = node
  const modifiedTime = dayjs(fields.modifiedTime)
  const birthTime = dayjs(fields.birthTime)
  return (
    <div className={`flex flex-wrap flex-auto text-gray-500 dark:text-gray-400 ${className} ${between && 'justify-between'}`} {...salAttr}>
      <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors' onClick={() => navigate('/archive')}>
        <EditSharp className='align-text-bottom text-base' /> {fromNow ? modifiedTime.fromNow() : modifiedTime.format(formatTemplate)}
      </span>
      <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors' onClick={() => navigate('/archive')}>
        <EventNoteIcon className='align-text-bottom text-base' /> {fromNow ? birthTime.fromNow() : birthTime.format(formatTemplate)}
      </span>
      {
        pageAttributes.category && (
          <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors' onClick={() => navigate('/category')}>
            <CategoryIcon className='align-text-bottom text-base' /> {pageAttributes.category}
          </span>
        )
      }
      <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors' onClick={() => navigate('/archive')}>
        <Visibility className='align-text-bottom text-base' /> {view.count}
      </span>
      {children}
    </div>
  )
}

export default PostSimpleInfo
