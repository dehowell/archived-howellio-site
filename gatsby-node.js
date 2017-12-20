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

    if (markdownSource === `posts`) {
      const filename = createFilePath({ node, getNode, basePath: `pages` });
      const [date, slug] = slugFromJekyllFilename(filename);

      createNodeField({ node, name: `slug`, value: slug});
      createNodeField({ node, name: `date`, value: new Date(date)});
      createNodeField({ node, name: `livehref`, value: `https://www.howell.io${slug}`})
    } else {
      const filename = createFilePath({ node, getNode, basePath: `biblio` });
      const [date, slug] = slugFromJekyllFilename(filename);
      createNodeField({ node, name: `slug`, value: slug});
    }
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

  // TODO Add another graphql query and combine with Promise.all
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
            livehref
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
          component: blogPostTemplate,
          context: {
            slug: node.fields.slug
          }
        })
      })
  });
};
