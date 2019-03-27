import React from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import styled from "@emotion/styled";

import Layout from "../components/layout";

const PrevNextNav = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
`;

const PrevLink = styled.li`
  text-align: left;
`;

const NextLink = styled.li`
  text-align: right;
`;

export default ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <article>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <PrevNextNav>
        <PrevLink>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              {previous.frontmatter.title}
              <br />
              &larr;
            </Link>
          )}
        </PrevLink>
        <NextLink>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title}
              <br /> &rarr;
            </Link>
          )}
        </NextLink>
      </PrevNextNav>
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
