import React from 'react'
import Link from 'gatsby-link'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="blog-posts">
      { posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .slice(0, 5)
          .map(({ node: post }) => {
            return (
              <div>
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                <p>{ post.excerpt }</p>
                <p css={{
                  textAlign: `right`,
                  fontSize: `smaller`
                }}>
                  <Link to={post.fields.slug}>Read More…</Link>
                </p>
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
