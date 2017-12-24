import React from 'react'
import Link from 'gatsby-link'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="blog-posts">
      <ul>
        { posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
              return (
                <ul>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                </ul>
              )
            })
        }
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
query IndexQuery {
  allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
    edges {
      node {
        id
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
