import React from 'react'
import Link from 'gatsby-link'

const ArchiveLink = props => (
  <li
    css={{
      listStyleType: 'none',
      '&::before': {
        content: props.isFavorite ? '★ ' : ''
      }
    }}
  >
    <Link to={ props.to }>{ props.title }</Link>
  </li>
)


export default function Archive({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="blog-posts">
      <ul>
        { posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
              const isFavorite = post.frontmatter.tags
                ? post.frontmatter.tags.includes('favorite')
                : false;

              return (
                <ArchiveLink
                  to={ post.fields.slug }
                  title={ post.frontmatter.title }
                  isFavorite={ isFavorite } />
              )
            })
        }
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
query ArchiveQuery {
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
          tags
        }
      }
    }
  }
}
`
