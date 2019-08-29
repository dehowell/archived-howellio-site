import { graphql } from "gatsby";
import _ from "lodash";
import React from "react";

import ArchiveLink from "../components/ArchiveLink";
import Head from "../components/Head";
import Layout from "../components/layout";

export default function Archive({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  const postsByYear = _.groupBy(posts, p => p.node.fields.year);

  return (
    <Layout>
      <Head title="Archive" />
      <h2>Collections</h2>
      <ul>
        <ArchiveLink
          to={"/bibliography/d3"}
          title={"An annotated bibliography regarding D3.js"}
        />
      </ul>
      {Object.keys(postsByYear)
        .sort()
        .reverse()
        .map(year => {
          let posts = postsByYear[year];
          return (
            <section>
              <h2>{year}</h2>
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
            </section>
          );
        })}
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
            year: date(formatString: "YYYY")
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
