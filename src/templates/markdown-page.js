import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => {
  const page = data.markdownRemark;
  return (
    <Layout>
      <article>
        <h1>{page.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query MarkdownPageById($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      html
    }
  }
`;
