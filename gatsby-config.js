module.exports = {
  siteMetadata: {
    title: 'echocow-blog',
    siteUrl: 'http://new.echocow.cn'
  },
  flags: {
    DEV_SSR: false,
    FAST_DEV: false,
    FAST_REFRESH: true,
    PARALLEL_SOURCING: true
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-transformer-json',
    'gatsby-plugin-react-helmet',
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
          showtitle: true
        }
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
    // {
    //   resolve: "gatsby-plugin-google-analytics",
    //   options: {
    //     trackingId: "",
    //   },
    // },
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
    }
  ]
}
