import React from "react";
import { graphql } from "gatsby";

export default ({ data }) => {
  let redirects = data.allMarkdownRemark.edges.map(({ node }, index) => {
    let postId = `${index}`;

    let isReadingsNode = node.frontmatter.title.indexOf("Readings: ") == 0;
    let slug = isReadingsNode
      ? node.fields.slug.slice(1, -10).replace(/\//g, "-")
      : node.fields.slug.slice(12, -1);

    return {
      from: node.fields.slug,
      to: `/${slug}/`,
      permanent: true
    };
  });

  return (
    <pre>
      <code>{JSON.stringify(redirects, null, 2)}</code>
    </pre>
  );
};

export const pageQuery = graphql`
  query RedirectsQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [fields___date] }
      filter: { fields: { source: { eq: "posts" } } }
    ) {
      edges {
        node {
          id
          fields {
            source
            draft
            slug
            topic
            topicName
            date
          }
          frontmatter {
            title
            layout
            template
            date
          }
        }
      }
    }
  }
`;
