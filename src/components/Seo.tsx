import { FC, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { useLocation } from '@reach/router'
import { SeoProps, SeoData } from '../interface/site'

const Seo: FC<SeoProps> = ({ post = { category: '' } }): ReactElement => {
  const { pathname } = useLocation()
  const { allDataJson, site } = useStaticQuery<SeoData>(graphql`
    {
      allDataJson {
        nodes {
          keyword
          description
          image
          name
          titleTemplate
        }
      }
      site {
        siteMetadata {
          description
          siteUrl
        }
      }
    }
  `)
  const { name, keyword, description, image, titleTemplate } = allDataJson.nodes[0]
  const { siteMetadata } = site
  return (
    <Helmet title={post.title || name} titleTemplate={titleTemplate}>
      <meta charSet='UTF-8' />
      <meta name='title' content={post.title || name} />
      <meta name='description' content={post.description || description} />
      <meta name='image' content={post.image || image} />
      <meta name='keywords' content={`${keyword} ${post.category}`} />
      <meta property='og:title' content={post.title || name} />
      <meta property='og:description' content={post.description || description} />
      <meta property='og:image' content={post.image || image} />
      <meta property='og:url' content={`${siteMetadata.siteUrl}${pathname}`} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={post.title || name} />
      <meta name='twitter:description' content={post.description || description} />
      <meta name='twitter:image' content={post.image || image} />
    </Helmet>
  )
}

export default Seo
