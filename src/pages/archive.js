import { css } from "@emotion/core";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import React from "react";

import Layout from "../components/layout";

// TODO re-add the star for favorite posts
const ArchiveLink = props => {
  const content = props.favorite ? " ★" : "";
  return (
    <li
      css={css`
        list-style-type: none;
        &::after {
          font-size: smaller;
          content: "${content}";
          color: #767676;
        }
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
            const isFavorite = post.frontmatter.tags
              ? post.frontmatter.tags.includes("favorite")
              : false;
            return (
              <ArchiveLink
                key={post.fields.slug}
                to={post.fields.slug}
                title={post.frontmatter.title}
                favorite={isFavorite}
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
