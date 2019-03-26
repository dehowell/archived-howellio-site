module.exports = [
  // bibliography feeds
  {
    serialize: ({ query: { site, allMarkdownRemark } }) => {
      return allMarkdownRemark.edges.map(edge => {
        return Object.assign({}, edge.node.frontmatter, {
          description: edge.node.excerpt,
          url: site.siteMetadata.siteUrl + edge.node.fields.slug,
          guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
          custom_elements: [{ "content:encoded": edge.node.html }]
        });
      });
    },
    query: `
     {
       allMarkdownRemark(
         limit: 1000,
         sort: { order: DESC, fields: [fields___date] },
         filter: { fields: { source: { eq: "posts" } } }
       ) {
         edges {
           node {
             excerpt
             html
             fields {
               date
               slug
             }
             frontmatter {
               title
             }
           }
         }
       }
     }
    `,
    output: "/rss.xml"
  }
];
