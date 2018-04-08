import React from 'react';
import Helmet from 'react-helmet';
import { css } from 'glamor'

import BibliographyRef from '../components/biblio/BibliographyRef';

const BibliographyIndexRef = props => (
  <div css={{
    fontSize: 'smaller'
  }}>
    <p>
      This post is part of an annotated bibliography on <a href={`/bibliography/${props.topic}`}>{props.name}</a>.
    </p>
  </div>
);

export default function Template({
  data,
}) {
  const { markdownRemark: reference } = data;
  return (
    <div className="blog-post-container">
      <Helmet title={`Notes – ${reference.frontmatter.title}`} />
      <div className="blog-post">
        <BibliographyRef
          author={reference.frontmatter.source.author}
          title={reference.frontmatter.source.title}
          slug={reference.fields.slug}
          source={reference.frontmatter.source}
          date={reference.fields.date}/>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: reference.html }}
        />
        <BibliographyIndexRef name={reference.fields.topicName} topic={reference.fields.topic}/>
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
}`
