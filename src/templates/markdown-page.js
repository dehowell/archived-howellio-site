import React from 'react';
import Helmet from 'react-helmet';

export default function Template({
  data
}) {
  const { markdownRemark: page } = data;
  return (
    <div className="blog-post-container">
      <Helmet title={`${page.title}`} />
      <div className="blog-post">
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query MarkdownPageById($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      frontmatter {
        title
      }
      html
    }
  }
`
