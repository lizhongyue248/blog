import { FC, ReactElement } from 'react'
import Alert from '@material-ui/lab/Alert'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Divider } from '@material-ui/core'
import PostSimpleInfo from './PostSimpleInfo'
import Comment from './Comment'
import { fromNow, isDeprecated } from '../util/dayjs'
import { PostContentProps } from '../interface/page'

export const salAttr = {
  'data-sal': 'fade',
  'data-sal-duration': '2000',
  'data-sal-repeat': 'true'
}

export const globalSalAttrString = 'data-sal="fade" data-sal-duration="500" data-sal-repeat="true"'

const PostContent: FC<PostContentProps> = (
  { node: post, children, comment = true }
): ReactElement => {
  const time = fromNow(post.fields.modifiedTime)
  return (
    <article className='post mb-7'>
      <div className='text-2xl md:text-4xl font-bold post-title text-center' {...salAttr}>
        {post.document.title}
      </div>
      <Divider className='mt-5' />
      <PostSimpleInfo node={post} className='max-w-lg mx-auto my-3' {...salAttr}>
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
        {
          isDeprecated(time) &&
            <div {...salAttr}>
              <Alert className='mb-10' variant='outlined' severity='warning'>
                <b>您当前所阅读的文章最后更新时间已经是 {`${time.humanize()}以前`}，文章内容可能已经过时，仅供学习与参考。</b>
              </Alert>
            </div>
        }
        <div className='mb-12' id='post-content' dangerouslySetInnerHTML={{ __html: post.html }} {...salAttr} />
      </div>
      {children}
      {comment && <Comment />}
    </article>
  )
}

export default PostContent
