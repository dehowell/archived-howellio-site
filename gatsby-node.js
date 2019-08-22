const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const bibliographies = {
  d3: "D3.js"
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    let filename = createFilePath({ node, getNode });
    let fileNode = getNode(node.parent);
    // `docs/` is subdivided by type of content, where each subdirectory is set
    // up as a separate, named filesystem source.
    let source = fileNode.sourceInstanceName;
    createNodeField({ node, name: "source", value: source });

    let isDraft = "draft" in node.frontmatter && node.frontmatter.draft;
    createNodeField({ node, name: "draft", value: isDraft });

    // TODO this is gross and could be organized/abstracted better
    switch (source) {
      case "posts":
        var { date, slug } = extractSlugFromJekyllFilename(filename);
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
      case "bibliography":
        var { date, slug } = extractSlugFromJekyllFilename(filename);
        const [, topic] = filename.match(/\/(.*?)\/.*$/);
        createNodeField({ node, name: "topic", value: topic });
        createNodeField({
          node,
          name: "topicName",
          value: bibliographies[topic]
        });
        createNodeField({ node, name: "slug", value: slug });
        createNodeField({
          node,
          name: "date",
          value: new Date(node.frontmatter.date || date)
        });
        break;
    }
  }
};

/*
 * Create a blog post for every Markdown file in docs/posts/.
 */
const createMarkdownBlogPosts = ({ actions, graphql }) => {
  const { createPage } = actions;
  const template = path.resolve("src/templates/blog-post.js");
  return graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { source: { eq: "posts" }, draft: { ne: true } } }
        sort: { order: DESC, fields: [fields___date] }
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
    }
  `).then(result => {
    let posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      createPage({
        path: post.node.fields.slug,
        component: template,
        context: {
          id: post.node.id,
          slug: post.node.fields.slug,
          previous,
          next
        }
      });
    });
  });
};

/*
 * Create a page for every Markdown file in docs/pages/
 */
const createMarkdownPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const defaultTemplate = path.resolve("src/templates/markdown-page.js");
  return graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { source: { eq: "pages" }, draft: { ne: true } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              template
            }
            fields {
              slug
              source
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(post => {
      console.log();
      let template = post.node.frontmatter.template
        ? path.resolve(`src/templates/${post.node.frontmatter.template}`)
        : defaultTemplate;

      createPage({
        path: post.node.fields.slug,
        component: template,
        context: {
          id: post.node.id,
          slug: post.node.fields.slug
        }
      });
    });
  });
};

/*
 * Create a bibliography entry for every Markdown file under docs/bibliography/
 */
const createBibliographyEntries = ({ actions, graphql }) => {
  const { createPage } = actions;
  const template = path.resolve("src/templates/biblio-post.js");

  return graphql(`
    {
      allMarkdownRemark(
        filter: {
          fields: { source: { eq: "bibliography" }, draft: { ne: true } }
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              slug
              source
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(post => {
      createPage({
        path: post.node.fields.slug,
        component: template,
        context: {
          id: post.node.id,
          slug: post.node.fields.slug
        }
      });
    });
  });
};

/*
 * Orchestrate together all the page creation functions and tie into build lifecycle.
 */
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const createBibliographyIndexes = Promise.resolve(
    Object.keys(bibliographies)
  ).then(topics => {
    topics.forEach(topic => {
      let template = path.resolve("src/templates/biblio-index.js");
      createPage({
        path: `/bibliography/${topic}`,
        component: template,
        context: {
          topic: topic
        }
      });
    });
  });

  return Promise.all([
    createMarkdownBlogPosts({ actions, graphql }),
    createMarkdownPages({ actions, graphql }),
    createBibliographyEntries({ actions, graphql }),
    createBibliographyIndexes
  ]);
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
