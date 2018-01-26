import React from 'react'
import Link from 'gatsby-link'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="blog-posts">
      { posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .slice(0, 1)
          .map(({ node: post }) => {
            return (
              <div className="blog-post">
                <h1>{post.frontmatter.title}</h1>
                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </div>
            )
          })
      }
    </div>
  )
}

export const pageQuery = graphql`
query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
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
`
