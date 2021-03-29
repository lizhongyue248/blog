import { FC, ReactElement } from 'react'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CategoryIcon from '@material-ui/icons/Category'
import { EditSharp } from '@material-ui/icons'
import { Node } from '../interface/asciidoc'

interface SimpleInfoProps {
  node: Node,
  className?: string
}

const PostSimpleInfo: FC<SimpleInfoProps> = ({ node, className }): ReactElement => {
  const { fields, pageAttributes } = node
  return (
    <div className={`flex-none text-gray-500 space-x-7 ${className}`}>
      <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors'>
        <EditSharp className='align-text-bottom text-base' /> {fields.modifiedTime}
      </span>
      <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors'>
        <EventNoteIcon className='align-text-bottom text-base' /> {fields.birthTime}
      </span>
      <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors'>
        <CategoryIcon className='align-text-bottom text-base' /> {pageAttributes.category}
      </span>
    </div>
  )
}

export default PostSimpleInfo
