// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerio = require('cheerio')

class CustomConverter {
  constructor (asciidoctor) {
    this.baseConverter = asciidoctor.Html5Converter.$new()
  }

  convert (node, transform) {
    const domString = this.baseConverter.convert(node, transform)
    const $ = cheerio.load(domString, null, false)
    const dom = $('div, h1, h2, h3, h4, h5, h6, ul, li')
    dom.prop('data-sal', 'fade')
    dom.prop('data-sal-duration', '500')
    dom.prop('data-sal-repeat', 'true')
    return $.html()
  }
}

module.exports = {
  siteMetadata: {
    title: '阿月很乖',
    description: '念念不忘，必有回响。',
    image: 'https://resources.echocow.cn/image/logo/logo-ghost.png',
    siteUrl: 'https://zyue.wiki'
  },
  flags: {
    DEV_SSR: false,
    FAST_DEV: true,
    FAST_REFRESH: true,
    PARALLEL_SOURCING: true,
    PRESERVE_WEBPACK_CACHE: true
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-baidu-analytics',
      options: {
        siteId: '5e4c4618ca1c2c8820c39ad5bc249d88',
        head: true
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-lodash',
    'gatsby-plugin-postcss',
    'gatsby-transformer-json',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './data/'
      }
    },
    {
      resolve: 'gatsby-transformer-asciidoc',
      options: {
        attributes: {
          icons: 'font'
        },
        safe: 'unsafe',
        converterFactory: CustomConverter
      }
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'jsx',
        allExtensions: true
      }
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png'
      }
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './posts'
      }
    },
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: ['/', { regex: '^/blog' }, { regex: '^/articles' }],
        excludePaths: ['/category', '/link'],
        height: 3,
        prependToBody: false,
        color: '#68a9ff',
        footerHeight: 500,
        headerHeight: 0
      }
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-NRHQLXP'
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                description
                siteUrl
                title
              }
            }
          }
        `,
        feeds: [
          {
            query: `
              query RSS {
                allAsciidoc(sort: {order: DESC, fields: fields___modifiedTime}) {
                  nodes {
                    document {
                      title
                    }
                    pageAttributes {
                      description
                    }
                    fields {
                      slug
                      modifiedTime(fromNow: true)
                    }
                    html
                    content
                  }
                }
              }
            `,
            serialize: ({ query: { site, allAsciidoc } }) =>
              allAsciidoc.nodes.map(node => ({
                description: node.pageAttributes.description,
                date: node.fields.modifiedTime,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{
                  'content:encoded': node.html.replace(/data-sal="fade" data-sal-duration="500" data-sal-repeat="true"/g, '')
                }]
              })),
            output: '/rss.xml',
            title: "A'yue Site's RSS Feed"
          }
        ]
      }
    }
  ]
}
