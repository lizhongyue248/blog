import { FC, ReactElement } from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PostSimpleInfo from './PostSimpleInfo'
import Comment from './Comment'
import { PostContentProps } from '../interface/page'

export const salAttr = {
  'data-sal': 'fade',
  'data-sal-duration': '2000',
  'data-sal-repeat': 'true'
}

const PostContent: FC<PostContentProps> = (
  { node: post, children, comment = true }
): ReactElement => {
  return (
    <article className='post mb-7'>
      <div className='text-4xl font-bold post-title text-center' {...salAttr}>
        {post.document.title}
      </div>
      <PostSimpleInfo node={post} className='text-center my-3' {...salAttr}>
        <span style={{ display: 'none' }} id='busuanzi_container_page_pv' className='cursor-pointer hover:text-blue-400 duration-500 transition-colors'>
          <VisibilityIcon className='align-text-bottom text-base' />
          <span className='ml-2' id='busuanzi_value_page_pv' />
        </span>
      </PostSimpleInfo>
      <div className='mt-5'>
        {
          post.pageAttributes.image &&
            <img
              className='w-full mb-10'
              alt={post.document.title}
              src={post.pageAttributes.image}
              {...salAttr}
            />
        }
        <div className='mb-12' id='post-content' dangerouslySetInnerHTML={{ __html: post.html }} {...salAttr} />
      </div>
      {children}
      {comment && <Comment />}
    </article>
  )
}

export default PostContent
