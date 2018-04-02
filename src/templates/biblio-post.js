import React from 'react';
import Helmet from 'react-helmet';

export default function Template({
  data,
}) {
  const { markdownRemark: post } = data;
  return (
    <div className="blog-post-container">
      <Helmet title={`Notes – ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>
          <a href={post.frontmatter.source.url}>
            {post.frontmatter.source.author}: {post.frontmatter.source.title}
          </a>
        </h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr/>
        <p>This post is part of an annotated bibliography about {post.fields.topic} TODO link here</p>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query BibloPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        date(formatString: "MMMM DD, YYYY")
        topic
      }
      frontmatter {
        title
        source {
          author
          title
          url
        }
      }
    }
  }
`
