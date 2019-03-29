import React from "react";
import { graphql } from "gatsby";

import BibliographyRef from "../components/BibliographyRef";
import Head from "../components/Head";
import Layout from "../components/layout";

export default ({ data }) => {
  const references = data.allMarkdownRemark.edges;
  const topicName = references[0].node.fields.topicName;
  return (
    <Layout>
      <Head title={`Annotated Bibliography - ${topicName}`} />
      <article>
        {references.map(({ node: reference }) => {
          return (
            <div>
              <BibliographyRef
                author={reference.frontmatter.source.author}
                title={reference.frontmatter.source.title}
                slug={reference.fields.slug}
                source={reference.frontmatter.source}
                date={reference.fields.date}
              />
              <div dangerouslySetInnerHTML={{ __html: reference.html }} />
            </div>
          );
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
