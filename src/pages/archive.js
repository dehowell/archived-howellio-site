import { graphql } from "gatsby";
import React from "react";

import ArchiveLink from "../components/ArchiveLink";
import Head from "../components/Head";
import Layout from "../components/layout";

export default function Archive({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout>
      <Head title="Archive" />
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
