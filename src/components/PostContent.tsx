import { FC, ReactElement, useState } from 'react'
import _ from 'lodash'
import { useBoolean } from 'ahooks'
import Alert from '@material-ui/lab/Alert'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import { Badge, Button, Divider, Snackbar } from '@material-ui/core'
import PostSimpleInfo from './PostSimpleInfo'
import Comment from './Comment'
import { fromNow, isDeprecated } from '../util/dayjs'
import { ActionType } from '../interface/site'
import { PostContentProps } from '../interface/page'
import { pageAction } from '../api/page-view'

export const salAttr = {
  'data-sal': 'fade',
  'data-sal-duration': '2000',
  'data-sal-repeat': 'true'
}

export const globalSalAttrString = 'data-sal="fade" data-sal-duration="500" data-sal-repeat="true"'

const PostContent: FC<PostContentProps> = (
  {
    node: post,
    children,
    comment = true,
    view = {
      id: 99999,
      name: 'home',
      title: 'Home',
      path: 'home',
      favorite: 0,
      hate: 0,
      count: 0
    }
  }
): ReactElement => {
  const time = fromNow(post.fields.modifiedTime)
  const [favorite, setFavorite] = useState(view.favorite)
  const [hate, setHate] = useState(view.hate)
  const [open, { toggle }] = useBoolean(false)
  const [message, setMessage] = useState('')
  const handleButton = async (type?: ActionType) => {
    if (_.isNull(type) || _.isUndefined(type)) {
      setMessage('功能还在开发中。。。呜呜呜~~')
      toggle()
      return
    }
    try {
      await pageAction(view, type)
      if (type === ActionType.FAVORITE) {
        setFavorite(favorite + 1)
        setMessage('感谢你的点赞我会继续努力的！')
      } else {
        setHate(hate + 1)
        setMessage('呜呜呜被踩了，哪里做得不好希望留言指正，我一定会改进的！')
      }
      toggle()
    } catch (e) {
      console.error(e.message)
      setMessage('发生了一点小意外....')
      toggle()
    }
  }
  return (
    <article className='post mb-7'>
      <div className='text-2xl md:text-4xl font-bold post-title text-center' {...salAttr}>
        {post.document.title}
      </div>
      <Divider className='mt-5' />
      <PostSimpleInfo node={post} className='max-w-lg mx-auto my-3' view={view} {...salAttr} />
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
      <div className='flex justify-end space-x-5 mb-5'>
        <Badge color='secondary' showZero badgeContent={favorite}>
          <Button
            variant='contained' size='small' color='primary' onClick={() => handleButton()}
            startIcon={<ThumbUpIcon />}
          >GOOD
          </Button>
        </Badge>
        <Button
          variant='contained' size='small' color='secondary' onClick={() => handleButton()}
          startIcon={<ThumbDownIcon />}
        >BAD
        </Button>
        <div className='hidden'>{hate}</div>
      </div>
      {children}
      {comment && <Comment />}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={open}
        onClose={() => toggle()}
        autoHideDuration={3000}
        message={message}
      />
    </article>
  )
}

export default PostContent
