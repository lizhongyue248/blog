import { FC, ReactElement } from 'react'
import { graphql } from 'gatsby'
import { Chip, Avatar } from '@material-ui/core'
import { getColor } from '../util/constant'
import { CategoryProps } from '../interface/page'
import Layout from '../components/Layout'

const CategoryPage: FC<CategoryProps> = ({ data }): ReactElement => {
  const category = data.allAsciidoc.group.map(g => ({ total: g.totalCount, category: g.nodes[0].pageAttributes.category }))
  return (
    <Layout title='分类'>
      <div className='text-2xl font-bold'>共计 {category.length} 个类别</div>
      {
        category.map((c, index) => (
          <Chip
            className={`mr-5 mt-5 border-${getColor(index)}-500 text-${getColor(index)}-500 `}
            key={c.category}
            avatar={<Avatar className={`bg-${getColor(index)}-500 text-white`}>{c.total}</Avatar>}
            label={c.category}
            clickable
            variant='outlined'
          />
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  {
    allAsciidoc {
      category: distinct(field: pageAttributes___category)
      group(field: pageAttributes___category) {
        nodes {
          pageAttributes {
            category
          }
        }
        totalCount
      }
    }
  }
`

export default CategoryPage
