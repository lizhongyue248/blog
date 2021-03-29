import { FC, ReactElement, useEffect } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import Prism from 'prismjs'
import { graphql, Link } from 'gatsby'
import { useBoolean } from 'ahooks'
import SpeedDial from '@material-ui/lab/SpeedDial'
import Alert from '@material-ui/lab/Alert'
import { ListAlt } from '@material-ui/icons'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Theme } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import { Divider, Drawer, Toolbar } from '@material-ui/core'
import NotFoundPage from '../pages/404'
import { PostProps } from '../interface/asciidoc'
import PostSimpleInfo from '../components/PostSimpleInfo'
import Layout from '../components/Layout'
import '../styles/fontawesome.min.css'
import '../styles/post.css'

interface CatalogueProps {
  list?: string
  show: boolean
  visibleToggle: () => void
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
        <Toolbar />
        <div className='px-5' dangerouslySetInnerHTML={{ __html: list }} />
      </div>
    </Drawer>
  )
}

const Post: FC<PostProps> = (props): ReactElement => {
  const { data, pageContext } = props
  if (data.allAsciidoc.edges.length < 0) return <NotFoundPage />
  const post = data.allAsciidoc.edges[0]
  const [copyStatue, { setTrue: show, setFalse: hide }] = useBoolean(false)
  const [drawer, { toggle: drawerToggle }] = useBoolean(false)

  const clipboard = useClipboard({ onSuccess: show })
  const parser = new DOMParser()
  const article = parser.parseFromString(post.node.html, 'text/html')
  const toc = article.querySelector('.toc')

  useEffect(() => {
    document.body.classList.add('line-numbers', 'match-braces')
    // document.body.setAttribute('data-download-link', true)
    Prism.highlightAll()
    // document.querySelectorAll('pre code').forEach(block => {
    //   const element = block as HTMLElement
    //   element.setAttribute('data-download-link', true)
    // })
    document.querySelector('#post-content .toc')?.classList.add('hidden')
    const headerSelect = Array(6).fill(0).map((_, index) => `.post h${index + 2}[id]`).join(',')
    document.querySelectorAll(headerSelect).forEach((block) => {
      const element = block as HTMLElement
      element.onclick = () => {
        const url = new URL(window.location.href)
        const link = `${url.origin}${url.pathname}#${element.id}`
        clipboard.copy(link)
      }
    })
    document.querySelectorAll('.post img').forEach(block => {
      const element = block as HTMLElement
      element.classList.add('shadow-image', 'mb-3')
    })
  })

  return (
    <Layout
      title={post.node.document.title}
      actions={[
        <SpeedDial
          ariaLabel='目录'
          key='list'
          icon={<ListAlt />}
          open={false}
          onClick={() => drawerToggle()}
        />]}
    >
      <Catalogue show={drawer} list={toc?.outerHTML} visibleToggle={drawerToggle} />
      <article className='post'>
        <div className='text-4xl font-bold post-title text-center'>{post.node.document.title}</div>
        <PostSimpleInfo node={post.node} className='text-center my-3' />
        <div className='mt-5'>
          {
            post.node.pageAttributes.image && <img className='w-full mb-10' alt={post.node.document.title} src={post.node.pageAttributes.image} />
          }
          <div id='post-content' dangerouslySetInnerHTML={{ __html: post.node.html }} />
        </div>
      </article>
      <Divider />
      <div className='mt-4'>
        <span>上一篇：</span>
        {
        pageContext.previous
          ? (
            <Link
              to={pageContext.previous.fields.slug}
            >
              {pageContext.previous.document.title}
            </Link>
            )
          : <span>没有了</span>
      }
      </div>
      <div className='mt-4'>
        <span>下一篇：</span>
        {
        pageContext.next
          ? (
            <Link
              to={pageContext.next.fields.slug}
            >
              {pageContext.next.document.title}
            </Link>
            )
          : <span>没有了</span>
      }
      </div>
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
    allAsciidoc(filter: {fields: {slug: {eq: $slug }}}) {
      edges {
        node {
          id
          fields {
            slug
            birthTime(fromNow: true, locale: "zh-cn")
            modifiedTime(fromNow: true, locale: "zh-cn")
          }
          html
          author {
            fullName
            email
          }
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
    }
  }
`

export default Post
