import React from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import Layout from "../components/layout";

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <article>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        date(formatString: "MMMM DD, YYYY")
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
