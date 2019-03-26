import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default ({ data }) => {
  const references = data.allMarkdownRemark.edges;
  const topicName = references[0].node.fields.topicName;
  return (
    <Layout>
      <Helmet title={`Annotated Bibliography - ${topicName}`} />
      <article>
        {references.map(({ node: reference }) => {
          return <p>reference.title</p>;
        })}
      </article>
    </Layout>
  );
};

export const query = graphql`
  query BiblioIndexByTopic($topic: String) {
    allMarkdownRemark(
      sort: { order: ASC, fields: [fields___date] }
      filter: {
        fields: { source: { eq: "bibliography" }, topic: { eq: $topic } }
      }
    ) {
      edges {
        node {
          fields {
            date(formatString: "MMMM DD, YYYY")
            topicName
            slug
          }
          frontmatter {
            title
            source {
              author
              title
              url
            }
          }
          html
        }
      }
    }
  }
`;
