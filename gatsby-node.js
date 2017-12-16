const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    console.log(node);
    const filename = createFilePath({ node, getNode, basePath: `pages` })
    console.log(filename);
    const [, date, year, month, day, title] = filename.match(
      /^\/(([\d]{4})-([\d]{2})-([\d]{2}))-{1}(.+)\/$/
    );
    const slug = `/${year}/${month}/${day}/${title}/`;
    createNodeField({ node, name: `slug`, value: slug });
    createNodeField({ node, name: `date`, value: new Date(date)});
    createNodeField({ node, name: `livehref`, value: `https://www.howell.io${slug}`})
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

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
