const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    let filename = createFilePath({ node, getNode });
    let fileNode = getNode(node.parent);
    // `docs/` is subdivided by type of content, where each subdirectory is set
    // up as a separate, named filesystem source.
    let source = fileNode.sourceInstanceName;
    createNodeField({ node, name: "source", value: source });

    switch (source) {
      case "posts":
        let { date, slug } = extractSlugFromJekyllFilename(filename);
        createNodeField({ node, name: "slug", value: slug });
        createNodeField({
          node,
          name: "date",
          value: new Date(node.frontmatter.date || date)
        });
        break;
      case "pages":
        createNodeField({ node, name: "slug", value: filename });
        break;
    }
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const templates = {
    pages: path.resolve("src/templates/markdown-page.js"),
    posts: path.resolve("src/templates/blog-post.js")
  };

  const markdownPosts = graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
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
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(post => {
      createPage({
        path: post.node.fields.slug,
        component: templates[post.node.fields.source],
        context: {
          id: post.node.id,
          slug: post.node.fields.slug
        }
      });
    });
  });

  return markdownPosts;
};

/*
   Helper functions for node/page creation.
 */

const extractSlugFromJekyllFilename = filename => {
  const [, date, year, month, day, title] = filename.match(
    /\/(([\d]{4})-([\d]{2})-([\d]{2}))-{1}(.+)\/$/
  );
  const slug = `/${year}/${month}/${day}/${title}/`;
  return { date, slug };
};
