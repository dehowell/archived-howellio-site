import React from 'react';
import Helmet from 'react-helmet';
import { css } from 'glamor'

import BibliographyRef from '../components/biblio/BibliographyRef';

const BibliographyIndexRef = props => (
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
        <BibliographyRef
          author={post.frontmatter.source.author}
          title={post.frontmatter.source.title}
          source={post.frontmatter.source}/>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <BibliographyIndexRef name={post.fields.topicName} topic={post.fields.topic}/>
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
