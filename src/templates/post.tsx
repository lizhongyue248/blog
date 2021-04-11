import { FC, ReactElement, useEffect, useState } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import Prism from 'prismjs'
import { graphql, Link } from 'gatsby'
import { useBoolean } from 'ahooks'
import SpeedDial from '@material-ui/lab/SpeedDial'
import Alert from '@material-ui/lab/Alert'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { ListAlt } from '@material-ui/icons'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Theme } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import { Divider, Drawer, Toolbar } from '@material-ui/core'
import { isBrowser } from '../util/constant'
import { PostMeta } from '../interface/page'
import { PostProps } from '../interface/asciidoc'
import PostSimpleInfo from '../components/PostSimpleInfo'
import Layout from '../components/Layout'
import Comment from '../components/Comment'
import '../styles/fontawesome.min.css'
import '../styles/asciidoc.scss'
import '../styles/post.scss'

interface CatalogueProps {
  list?: string
  show: boolean
  visibleToggle: () => void
}

const salAttr = {
  'data-sal': 'fade',
  'data-sal-duration': '2000',
  'data-sal-repeat': 'true'
}

const Catalogue: FC<CatalogueProps> = ({ list = '', show: drawer, visibleToggle }): ReactElement => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  return (
    <Drawer
      variant={matches ? 'persistent' : 'temporary'}
      id='post-catalogue'
      className='shadow-xl'
      open={drawer}
      onClose={() => visibleToggle()}
    >
      <div style={{ zIndex: 800 }}>
        {matches && <Toolbar />}
        <div className='px-5' id='post-toc' dangerouslySetInnerHTML={{ __html: list }} />
      </div>
    </Drawer>
  )
}

const Post: FC<PostProps> = (props): ReactElement => {
  const { data, pageContext } = props
  const post = data.asciidoc
  const [copyStatue, { setTrue: show, setFalse: hide }] = useBoolean(false)
  const [drawer, { toggle: drawerToggle }] = useBoolean(false)
  const [toc, setToc] = useState('')
  const clipboard = useClipboard({ onSuccess: show })

  useEffect(() => {
    document.body.classList.add('line-numbers', 'match-braces')
    const parser = new DOMParser()
    const article = parser.parseFromString(post.html, 'text/html')
    const tocElement = article.querySelector('.toc') || { outerHTML: '' }
    setToc(tocElement.outerHTML.replaceAll('data-sal="fade" data-sal-duration="1000" data-sal-repeat="true"', ''))
    document.querySelector('#post-content .toc')?.classList.add('hidden')
    const headerSelect = Array(6).fill(0).map((_, index) => `.post h${index + 2}[id]`).join(',')
    document.querySelectorAll(headerSelect).forEach((block) => {
      const element = block as HTMLElement
      element.onclick = () => {
        const url = new URL(isBrowser() ? window.location.href : '')
        const link = `${url.origin}${url.pathname}#${element.id}`
        clipboard.copy(link)
      }
    })
    document.querySelectorAll('.post img').forEach(block => {
      const element = block as HTMLElement
      element.classList.add('shadow-image', 'mb-3')
    })
    Prism.highlightAll()
  }, [])

  const postMeta: PostMeta = {
    title: post.document.title,
    image: post.pageAttributes.image,
    description: post.pageAttributes.description,
    category: post.pageAttributes.category
  }

  return (
    <Layout
      title={postMeta.title}
      postMeta={postMeta}
      actions={[
        <SpeedDial
          ariaLabel='目录'
          key='list'
          icon={<ListAlt />}
          open={false}
          onClick={() => drawerToggle()}
        />]}
    >
      <Catalogue show={drawer} list={toc} visibleToggle={drawerToggle} />
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
          <div id='post-content' dangerouslySetInnerHTML={{ __html: post.html }} {...salAttr} />
        </div>
      </article>
      <Divider />
      <div className='mt-4 font-bold' {...salAttr}>
        <span>上一篇：</span>
        {
        pageContext.previous
          ? (
            <Link to={pageContext.previous.fields.slug}>
              {pageContext.previous.document.title}
            </Link>
            )
          : <span>没有了</span>
      }
      </div>
      <div className='mt-4 font-bold' {...salAttr}>
        <span>下一篇：</span>
        {
          pageContext.next
            ? (
              <Link to={pageContext.next.fields.slug}>
                {pageContext.next.document.title}
              </Link>
              )
            : <span>没有了</span>
        }
      </div>
      <Comment />
      <Snackbar
        open={copyStatue}
        autoHideDuration={3000}
        onClose={hide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert className='w-72' variant='filled' severity='success' onClose={hide}>
          复制链接成功
        </Alert>
      </Snackbar>
    </Layout>
  )
}

export const query = graphql`
  query Post($slug: String!) {
    asciidoc(fields: {slug: {eq: $slug}}) {
      id
      fields {
        slug
        birthTime(fromNow: true, locale: "zh-cn")
        modifiedTime(fromNow: true, locale: "zh-cn")
      }
      html
      document {
        title
      }
      pageAttributes {
        category
        description
        image
        sort
      }
    }
  }
`

export default Post
