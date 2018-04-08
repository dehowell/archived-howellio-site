const _ = require('lodash');
const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)

const bibliographies = {
  'd3': 'D3.js'
};

var slugFromJekyllFilename = (filename) => {
  const [, date, year, month, day, title] = filename.match(
    /\/(([\d]{4})-([\d]{2})-([\d]{2}))-{1}(.+)\/$/
  );
  const slug = `/${year}/${month}/${day}/${title}/`;
  return [date, slug];
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const filename = createFilePath({ node, getNode });
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;
    const today = (new Date()).toISOString().slice(0, 10)

    switch (source) {
      case 'pages':
        var [date, slug] = [today, filename];
        break;
      case 'posts':
        var [date, slug] = slugFromJekyllFilename(filename);
        break;
      case 'bibliography':
        var [date, slug] = slugFromJekyllFilename(filename);
        const [, topic] = filename.match(/\/(.*?)\/.*$/);
        createNodeField({ node, name: `topic`, value: topic });
        createNodeField({ node, name: `topicName`, value: bibliographies[topic] });
        break;
    }

    createNodeField({ node, name: `slug`, value: slug});
    createNodeField({ node, name: `date`, value: new Date(date)});
    createNodeField({ node, name: `source`, value: source });
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const templates = {
    pages: path.resolve(`src/templates/markdown-page.js`),
    bibliography: path.resolve(`src/templates/biblio-post.js`),
    posts: path.resolve(`src/templates/blog-post.js`)
  }

  const markdownPages = graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [fields___date] }
      limit: 1000
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
            date
            source
          }
        }
      }
    }
  }`)
  .then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges
      .forEach(({node}) => {

        createPage({
          path: node.fields.slug,
          component: templates[node.fields.source],
          context: {
            id: node.id,
            slug: node.fields.slug
          }
        })
      })
  });

  const bibliographyIndexes = Promise.resolve(_.keys(bibliographies))
    .then(topics => {
      topics.forEach( topic => {
        let template = path.resolve(`src/templates/biblio-index.js`);

        createPage({
          path: `bibliography/${topic}`,
          component: template,
          context: {
            topic: topic
          }
        })
      })
    });


  return Promise.all([markdownPages], bibliographyIndexes);
};
