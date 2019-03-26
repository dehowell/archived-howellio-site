import React from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import Layout from "../components/layout";
//
// export default ({ data }) => {
//   const references = data.allMarkdownRemark.edges;
//   const topicName = references[0].node.fields.topicName;
//   return (
//     <article>
//       {references.map(({ node: reference }) => {
//         return <p>reference.title</p>;
//       })}
//     </article>
//   );
// };
//
export const query = graphql`
  query BiblioIndexByTopic($topic: String) {
    allMarkdownRemark(
      sort: { order: ASC, fields: [fields___date] }
      filter: { fields: { source: { eq: "bibliography" } } }
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
