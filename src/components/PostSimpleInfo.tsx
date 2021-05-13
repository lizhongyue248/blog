import { FC, ReactElement } from 'react'
import { navigate } from 'gatsby'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CategoryIcon from '@material-ui/icons/Category'
import { EditSharp } from '@material-ui/icons'
import dayjs, { formatTemplate } from '../util/dayjs'
import { Node } from '../interface/asciidoc'

interface SimpleInfoProps {
  node: Node,
  className?: string,
  children?: ReactElement,
  fromNow?: boolean
}

const PostSimpleInfo: FC<SimpleInfoProps> = ({ node, className, children, fromNow = false }): ReactElement => {
  const { fields, pageAttributes } = node
  const modifiedTime = dayjs(fields.modifiedTime)
  const birthTime = dayjs(fields.birthTime)
  return (
    <div className={`flex flex-wrap flex-auto justify-between text-gray-500 dark:text-gray-400 ${className}`}>
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
      {children}
    </div>
  )
}

export default PostSimpleInfo
