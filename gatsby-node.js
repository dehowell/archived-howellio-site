const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path');

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
    const fileNode = getNode(node.parent);
    const markdownSource = fileNode.sourceInstanceName;
    const filename = createFilePath({ node, getNode, basePath: markdownSource });
    const [date, slug] = slugFromJekyllFilename(filename);
    createNodeField({ node, name: `slug`, value: slug});
    createNodeField({ node, name: `date`, value: new Date(date)});
    createNodeField({ node, name: `source`, value: markdownSource });
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const templates = {
    posts: path.resolve(`src/templates/blog-post.js`),
    biblio: path.resolve(`src/templates/biblio-post.js`)
  }

  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [fields___date] }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
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
            slug: node.fields.slug
          }
        })
      })
  });
};
