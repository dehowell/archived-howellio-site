import React from "react";
import { graphql } from "gatsby";

import Head from "../components/Head";
import Layout from "../components/layout";

export default ({ data }) => {
  const page = data.markdownRemark;
  return (
    <Layout>
      <Head title={page.frontmatter.title} />
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
