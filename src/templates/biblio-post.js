import React from 'react';
import Helmet from 'react-helmet';
import { css } from 'glamor'

const BibliographyRef = props => (
  <div css={{
    fontSize: 'smaller'
  }}>
    <p>This post is part of an annotated bibliography about {props.topic} TODO link here</p>
  </div>
);

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
        <BibliographyRef name={post.fields.topicName} topic={post.fields.topic}/>
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
        topicName
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
