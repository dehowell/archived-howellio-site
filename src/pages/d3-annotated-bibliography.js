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
                <li>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
query BiblioQuery {
  allMarkdownRemark(
    sort: { order: ASC, fields: [fields___date] },
    filter: { frontmatter: { tags: { in: "d3" } } }
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
        }
      }
    }
  }
}
`
