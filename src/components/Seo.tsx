import { FC, ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { useRequest } from 'ahooks'
import { useLocation } from '@reach/router'
import { isBrowser } from '../util/constant'
import { SeoProps, SeoData, PageView } from '../interface/site'
import { pageView } from '../api/page-view'

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
  const url = new URL(isBrowser() ? window.location.href : 'https://zyue.wiki/home')
  if (!url.pathname.startsWith('/articles')) {
    useRequest<PageView>(() => pageView(post.title || name, post.title || name, url.pathname), { throwOnError: true })
  }
  return (
    <Helmet
      title={post.title || name}
      titleTemplate={titleTemplate}
      script={[
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
