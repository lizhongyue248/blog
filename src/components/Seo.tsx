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
    <Helmet
      title={post.title || name}
      titleTemplate={titleTemplate}
      script={[
        { async: true, src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' },
        { async: true, 'data-ad-client': 'ca-pub-4396842140136522', src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' }
      ]}
      meta={[
        { name: 'baidu_union_verify', content: 'a9ce529a9d7c1b784ccea1a3c0e6b64c' },
        { name: 'title', content: post.title || name },
        { name: 'description', content: post.description || description },
        { name: 'image', content: post.image || image },
        { name: 'keywords', content: `${keyword} ${post.category}` },
        { property: 'og:title', content: post.title || name },
        { property: 'og:description', content: post.description || description },
        { property: 'og:url', content: `${siteMetadata.siteUrl}${pathname}` },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:title', content: post.title || name },
        { property: 'twitter:description', content: post.description || description },
        { property: 'twitter:image', content: post.image || image },
        { charSet: 'UTF-8' }
      ]}
    />
  )
}

export default Seo
