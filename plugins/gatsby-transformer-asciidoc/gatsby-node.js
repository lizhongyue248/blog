/* eslint-disable */
const asciidoc = require('asciidoctor')()
const Asciidoctor = require('asciidoctor')
const _ = require('lodash')

const filterAsciiDoc = ({ node }, pluginOptions = {}) => {
  const extensionsConfig = pluginOptions.fileExtensions

  // make extensions configurable and use adoc and asciidoc as default
  const supportedExtensions =
    extensionsConfig instanceof Array ? extensionsConfig : ['adoc', 'asciidoc']

  return supportedExtensions.includes(node.extension)
}

exports.onCreateNode = async (
  {
    node,
    actions,
    pathPrefix,
    loadNodeContent,
    createNodeId,
    reporter,
    createContentDigest
  },
  pluginOptions
) => {
  if (!filterAsciiDoc({ node }, pluginOptions)) {
    return
  }

  // register custom converter if given
  if (pluginOptions.converterFactory) {
    asciidoc.ConverterFactory.register(
      new pluginOptions.converterFactory(asciidoc),
      ['html5']
    )
  }

  // changes the incoming imagesdir option to take the
  const asciidocOptions = processPluginOptions(pluginOptions, pathPrefix)

  const { createNode, createParentChildLink } = actions
  // Load Asciidoc contents
  const content = await loadNodeContent(node)
  // Load Asciidoc file for extracting
  // https://asciidoctor-docs.netlify.app/asciidoctor.js/latest/processor/extract-api/
  // We use a `let` here as a warning: some operations, like .convert() mutate the document
  /** @type {Asciidoctor.Document} */
  const doc = await asciidoc.load(content, {
    base_dir: node.dir,
    ...asciidocOptions
  })

  try {
    const html = doc.convert()
    // Use "partition" option to be able to get title, subtitle, combined
    const title = doc.getDocumentTitle({ partition: true })

    let revision = null
    if (doc.hasRevisionInfo()) {
      revision = {
        date: doc.getRevisionDate(),
        number: doc.getRevisionNumber(),
        remark: doc.getRevisionRemark()
      }
    }

    const pageAttributes = extractPageAttributes(doc.getAttributes())

    const asciiNode = {
      id: createNodeId(`${node.id} >>> ASCIIDOC`),
      parent: node.id,
      internal: {
        type: 'Asciidoc',
        mediaType: 'text/html'
      },
      children: [],
      html,
      document: {
        title: title?.getCombined() ?? '',
        subtitle: title?.hasSubtitle() ? title.getSubtitle() : '',
        main: title?.getMain() ?? ''
      },
      content,
      revision,
      pageAttributes
    }

    asciiNode.internal.contentDigest = createContentDigest(asciiNode)

    createNode(asciiNode)
    createParentChildLink({ parent: node, child: asciiNode })
  } catch (err) {
    reporter.panicOnBuild(
      `Error processing Asciidoc ${node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`}:\n
      ${err.message}`
    )
  }
}

const processPluginOptions = _.memoize((pluginOptions, pathPrefix) => {
  const defaultImagesDir = '/images@'
  const currentPathPrefix = pathPrefix || ''

  const clonedPluginOptions = _.cloneDeep(pluginOptions)

  if (clonedPluginOptions.attributes === undefined) {
    clonedPluginOptions.attributes = {}
  }

  clonedPluginOptions.attributes.imagesdir = withPathPrefix(
    currentPathPrefix,
    clonedPluginOptions.attributes.imagesdir || defaultImagesDir
  )

  return clonedPluginOptions
})

const withPathPrefix = (pathPrefix, url) =>
  (pathPrefix + url).replace(/\/\//, '/')

const extractPageAttributes = allAttributes =>
  Object.entries(allAttributes).reduce((pageAttributes, [key, value]) => {
    if (key.startsWith('page-')) {
      pageAttributes[key.replace(/^page-/, '')] = value
    }
    return pageAttributes
  }, {})

exports.unstable_shouldOnCreateNode = filterAsciiDoc
