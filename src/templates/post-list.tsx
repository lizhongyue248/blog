import { FC, ReactElement, ChangeEvent } from 'react'
import { graphql, navigate } from 'gatsby'
import Pagination from '@material-ui/lab/Pagination'
import PublishIcon from '@material-ui/icons/Publish'
import { createStyles } from '@material-ui/core/styles'
import { Grid, makeStyles } from '@material-ui/core'
import { PostListProps, Node } from '../interface/asciidoc'
import PostSimpleInfo from '../components/PostSimpleInfo'
import Layout from '../components/Layout'

const useStyles = makeStyles(() =>
  createStyles({
    description: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 3,
      '-webkit-box-orient': 'vertical'
    }
  })
)

const PostSimple: FC<Node> = (node): ReactElement => {
  const {
    document,
    fields,
    pageAttributes
  } = node
  const classes = useStyles()
  const toPost = async () => {
    await navigate(fields.slug)
  }
  return (
    <Grid
      container
      className='py-4 mt-6'
      data-sal='slide-up'
      data-sal-duration='1000'
      data-sal-repeat='true'
    >
      <Grid item md={5} xs={12}>
        <div className='cursor-pointer shadow-image overflow-hidden lg:mr-8 h-full' onClick={toPost}>
          <img
            src={pageAttributes.image}
            className='transition-all w-full m-0 h-full transform duration-500 hover:scale-150'
            alt={document.title}
          />
        </div>
      </Grid>
      <Grid item xs className='flex flex-col h-72 md:h-52 mt-7 px-4 md:px-0 lg:mt-0'>
        <div className='flex-none'>
          <h1
            className='text-2xl font-bold text-black mt-0 cursor-pointer hover:text-blue-400 duration-500 transition-colors'
            onClick={toPost}
          >
            {
              pageAttributes.sort && <PublishIcon className='align-top text-4xl' />
            }
            {document.title}
          </h1>
        </div>
        <div className='flex-grow text-left text-lg cursor-pointer overflow-hidden'>
          <p
            className={`mt-0 hover:text-blue-400 duration-500 transition-colors ${classes.description}`}
            onClick={toPost}
          >
            {pageAttributes.description}
          </p>
        </div>
        <PostSimpleInfo fromNow node={node} />
      </Grid>
    </Grid>
  )
}

const PostList: FC<PostListProps> = ({ data }): ReactElement => {
  const nodes = data.allAsciidoc.edges.map(edge => edge.node)
  const {
    pageInfo = {
      itemCount: 0,
      pageCount: 0,
      currentPage: 1
    }
  } = data.allAsciidoc

  const handleChange = async (_: ChangeEvent<unknown>, value: number) => {
    await navigate(`/blog/${value <= 1 ? '' : value}`)
  }
  return (
    <Layout other={<div>念念不忘，必有回响</div>}>
      {nodes.map(node => (<PostSimple key={node.id} {...node} />))}
      <div
        className='flex'
        data-sal='slide-up'
        data-sal-duration='1000'
        data-sal-repeat='true'
      >
        <Pagination
          className='mx-auto my-8'
          count={pageInfo.pageCount}
          page={pageInfo.currentPage}
          onChange={handleChange}
          color='primary'
          showFirstButton
          showLastButton
        />
      </div>
    </Layout>
  )
}

export default PostList

export const pageQuery = graphql`
  query pageQuery($skip: Int!, $limit: Int!) {
    allAsciidoc(
      filter: {pageAttributes: {exclude: {ne: "true"}}}
      sort: {order: [ASC, DESC], fields: [pageAttributes___sort, fields___birthTime]},
      limit: $limit,
      skip: $skip
    ) {
      edges {
        node {
          id
          fields {
            slug
            birthTime
            modifiedTime
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
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        pageCount
        itemCount
      }
    }
  }
`
