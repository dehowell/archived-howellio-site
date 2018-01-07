import React from 'react';
import Helmet from 'react-helmet';

export default function Template({
  data,
}) {
  const { wordpressPage: page } = data;
  return (
    <div className="blog-post-container">
      <Helmet title={`${page.title}`} />
      <div className="blog-post">
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query WordpressPageById($id: String!) {
    wordpressPage(id: {eq: $id}) {
      id
      title
      content
    }
  }
`
