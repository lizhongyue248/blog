import { FC, ReactElement } from 'react'
import { graphql, navigate } from 'gatsby'
import { List, ListItem } from '@material-ui/core'
import Layout from '../components/Layout'

interface ArchiveProps {
  data: {
    allAsciidoc: {
      group: {
        nodes: {
          id: string,
          document: {
            title: string
          },
          fields: {
            year: number,
            slug: string
          },
          revision: {
            date: string
          }
        }[]
      }[],
      totalCount: number
    }
  }
}

const ArchivePage: FC<ArchiveProps> = ({ data }): ReactElement => {
  const archives = data.allAsciidoc.group.map(item => ({
    year: item.nodes[0].fields.year,
    nodes: item.nodes
  }))
  return (
    <Layout title='归档'>
      <List>
        <ListItem className='text-2xl font-bold'>共计 {data.allAsciidoc.totalCount} 篇文章</ListItem>
        {
          archives.map(archive => (
            <List key={archive.year}>
              <ListItem className='text-2xl font-bold'>{archive.year}</ListItem>
              {
                archive.nodes.map(node => (
                  <ListItem
                    className='flex justify-between px-10 text-xl hover:text-blue-400 duration-500 transition-colors'
                    key={node.fields.slug}
                    onClick={() => navigate(node.fields.slug)}
                    button
                  >
                    <div>{node.document.title}</div>
                    <div>{node.revision.date}</div>
                  </ListItem>
                ))
              }
            </List>
          ))
        }
      </List>
    </Layout>
  )
}

export const query = graphql`
  {
    allAsciidoc(sort: {order: DESC, fields: revision___date}) {
      group(field: fields___year) {
        nodes {
          id
          document {
            title
          }
          revision {
            date
          }
          fields {
            year
            slug
          }
        }
      }
      totalCount
    }
  }
`

export default ArchivePage
