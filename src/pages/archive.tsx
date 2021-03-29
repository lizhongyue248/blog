import { FC, ReactElement } from 'react'
import _ from 'lodash'
import { graphql, navigate } from 'gatsby'
import { useSetState } from 'ahooks'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import { List, ListItem, ListItemText, Collapse, Avatar } from '@material-ui/core'
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
            slug: string,
            birthTime: string
          }
        }[]
      }[],
      totalCount: number
    }
  }
}

const ArchivePage: FC<ArchiveProps> = ({ data }): ReactElement => {
  const archives = data.allAsciidoc.group
    .map(item => ({
      year: item.nodes[0].fields.year,
      nodes: _.sortBy(item.nodes, o => o.fields.birthTime)
    }))
    .sort((a, b) => (b.year - a.year))
  const [open, setOpen] = useSetState<{[key: number]: boolean}>(archives.map(archive => archive.year).reduce((acc, curr, currentIndex) => ({
    ...acc,
    [curr]: currentIndex === 0
  }), {}))
  return (
    <Layout title='归档'>
      <List>
        <ListItem className='text-2xl font-bold'>共计 {data.allAsciidoc.totalCount} 篇文章</ListItem>
        {
          archives.map(archive => (
            <List key={archive.year}>
              <ListItem
                onClick={() => setOpen({ [archive.year]: !open[archive.year] })}
                className='text-2xl font-bold'
                button
              >
                <ListItemText>
                  <Avatar className='w-7 h-7 text-sm inline-block align-middle mr-2 leading-7 text-center bg-blue-500'>
                    {archive.nodes.length}
                  </Avatar>
                  <span>
                    {archive.year}
                  </span>
                </ListItemText>
                {open[archive.year] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open[archive.year]} timeout='auto' unmountOnExit>
                <List>
                  {
                    archive.nodes.map(node => (
                      <ListItem
                        className='flex justify-between px-10 text-xl hover:text-blue-400 duration-500 transition-colors'
                        onClick={() => navigate(node.fields.slug)}
                        key={node.fields.slug}
                        button
                      >
                        <div>{node.document.title}</div>
                        <div>{node.fields.birthTime}</div>
                      </ListItem>
                    ))
                }
                </List>
              </Collapse>
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
          fields {
            year
            slug
            birthTime(formatString: "YYYY-MM-DD")
          }
        }
      }
      totalCount
    }
  }
`

export default ArchivePage
