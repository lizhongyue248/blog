/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Asciidoc') {
    /** @type {{modified: number}} */
    const { pageAttributes } = node
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({ node, name: 'slug', value: node.pageAttributes.href || `/post${slug}` })
    /** @type {{birthTime: string, modifiedTime: string}} */
    const parent = getNode(node.parent)
    const birthTime = new Date(Number(pageAttributes.created) || pageAttributes.created || parent.birthTime)
    const modifiedTime = new Date(Number(pageAttributes.modified) || pageAttributes.modified || parent.modifiedTime)
    createNodeField({ node, name: 'year', value: birthTime.getFullYear() })
    createNodeField({ node, name: 'birthTime', value: birthTime })
    createNodeField({ node, name: 'modifiedTime', value: modifiedTime })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  /** @type {{data: {allAsciidoc}}} result */
  const result = await graphql(`
    query {
      allAsciidoc(
        sort: {order: [ASC, DESC], fields: [pageAttributes___sort, fields___birthTime]}
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            document {
              title
            }
            fields {
              slug
            }
          }
          previous {
            document {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const posts = result.data.allAsciidoc.edges
  posts.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post.tsx'),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        next: previous,
        previous: next
      }
    })
  })
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/blog' : `/blog/${i + 1}`,
      component: path.resolve('./src/templates/post-list.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /prismjs/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}