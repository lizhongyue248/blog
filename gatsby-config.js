module.exports = {
  siteMetadata: {
    title: '阿月很乖',
    siteUrl: 'https://blog.ayue.wiki'
  },
  flags: {
    DEV_SSR: false,
    FAST_DEV: false,
    FAST_REFRESH: true,
    PARALLEL_SOURCING: true
  },
  plugins: [
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
        safe: 'unsafe'
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
      resolve: 'gatsby-plugin-scroll-reveal',
      options: {
        threshold: 1,
        once: true,
        disable: false
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
    }
  ]
}
