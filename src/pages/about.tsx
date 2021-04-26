import { FC, ReactElement } from 'react'
import { graphql } from 'gatsby'
import { getBanner } from '../util/constant'
import { Node } from '../interface/asciidoc'
import PostContent from '../components/PostContent'
import Layout from '../components/Layout'

interface AboutProps {
  data: {
    asciidoc: Node
  }
}

const About: FC<AboutProps> = ({ data }): ReactElement => {
  const post = data.asciidoc
  return (
    <Layout title={post.document.title} banner={getBanner(5)}>
      <PostContent node={post} />
    </Layout>
  )
}

export const query = graphql`
  {
    asciidoc(document: {title: {eq: "关于"}}) {
      id
      html
      fields {
        birthTime(fromNow: true, locale: "zh-cn")
        modifiedTime(fromNow: true, locale: "zh-cn")
      }
      document {
        title
        subtitle
      }
      pageAttributes {
        category
        image
      }
    }
  }
`

export default About
