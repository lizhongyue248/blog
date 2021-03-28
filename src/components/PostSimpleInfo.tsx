import { FC, ReactElement } from 'react'
import gravatarUrl from 'gravatar-url'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CategoryIcon from '@material-ui/icons/Category'
import { Avatar } from '@material-ui/core'
import { Node } from '../interface/asciidoc'

interface SimpleInfoProps {
  node: Node,
  className?: string
}

const PostSimpleInfo: FC<SimpleInfoProps> = ({ node, className }): ReactElement => {
  const { revision, pageAttributes, author } = node
  const url = gravatarUrl(author.email, { size: 32 })
  return (
    <div className={`flex-none text-gray-500 space-x-7 ${className}`}>
      <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors'>
        <EventNoteIcon className='align-text-bottom text-base' /> {revision.date}
      </span>
      <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors'>
        <CategoryIcon className='align-text-bottom text-base' /> {pageAttributes.category}
      </span>
      <span className='cursor-pointer hover:text-blue-400 duration-500 transition-colors'>
        <Avatar alt={author.fullName} src={url} className='align-text-bottom w-4 h-4 inline-block' /> {author.fullName}
      </span>
    </div>
  )
}

export default PostSimpleInfo
