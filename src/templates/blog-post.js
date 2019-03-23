import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link'


export default function Template({
  data,
}) {
  const { markdownRemark: post } = data;
  return (
    <div className="blog-post-container">
      <Helmet title={`${post.frontmatter.title} | howell.io`} />
      <div className="blog-post">
        <Link to={post.fields.slug}><h1>{post.frontmatter.title}</h1></Link>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    fields {
      date(formatString: "MMMM DD, YYYY")
      slug
    }
    frontmatter {
      title
    }
  }
}`
