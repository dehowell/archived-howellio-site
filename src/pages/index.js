import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";

import Layout from "../components/layout";

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;
  const post = posts[0].node;
  return (
    <Layout>
      <article>
        <h1>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [fields___date] }
      filter: { fields: { source: { eq: "posts" } } }
      limit: 1
    ) {
      edges {
        node {
          id
          html
          excerpt(pruneLength: 280)
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
