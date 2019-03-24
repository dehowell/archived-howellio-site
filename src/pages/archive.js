import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";

import Layout from "../components/layout";

const ArchiveLink = props => (
  <li
    style={{
      listStyleType: "none",
      "&::after": {
        content: props.isFavorite ? " ★" : "",
        color: "#767676"
      }
    }}
  >
    <Link to={props.to}>{props.title}</Link>
  </li>
);

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
            console.log(JSON.stringify(post));
            const isFavorite = post.frontmatter.tags
              ? post.frontmatter.tags.includes("favorite")
              : false;
            return (
              <ArchiveLink
                to={post.fields.slug}
                title={post.frontmatter.title}
                isFavorite={isFavorite}
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
