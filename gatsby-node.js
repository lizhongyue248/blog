/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'Asciidoc') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({ node, name: 'slug', value: `/post${slug}` })
    const date = new Date(node.revision.date)
    createNodeField({ node, name: 'year', value: date.getFullYear() })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  /** @type {{data: {allAsciidoc}}} result */
  const result = await graphql(`
    query {
      allAsciidoc {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const posts = result.data.allAsciidoc.edges
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post.tsx'),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug
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
