import { css } from "@emotion/core";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import React from "react";

import Layout from "../components/layout";

// TODO re-add the star for favorite posts
const ArchiveLink = props => {
  return (
    <li
      css={css`
        list-style-type: none;
      `}
    >
      <Link to={props.to}>{props.title}</Link>
    </li>
  );
};

export default function Archive({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout>
      <ul>
        <ArchiveLink
          to={"/bibliography/d3"}
          title={"An annotated bibliography regarding D3.js"}
        />
      </ul>
      <h2>Posts</h2>
      <ul>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <ArchiveLink
                to={post.fields.slug}
                title={post.frontmatter.title}
              />
            );
          })}
      </ul>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ArchiveQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [fields___date] }
      filter: { fields: { source: { eq: "posts" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;
