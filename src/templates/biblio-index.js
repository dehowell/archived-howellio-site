import React from 'react';
import Helmet from 'react-helmet';

import BibliographyRef from '../components/biblio/BibliographyRef';

export default function Template({
  data,
}) {
  const { edges: references } = data.allMarkdownRemark;
  const topicName = references[0].node.fields.topicName;
  return (
    <div className="blog-posts">
    <h1>Annotated Bibliography – {topicName}</h1>
    <Helmet title={`Annotated Bibliography – ${topicName}`} />
      { references
          .map(({node: reference}) => {
            return (
              <div className="blog-post">
                <BibliographyRef
                  author={reference.frontmatter.source.author}
                  title={reference.frontmatter.source.title}
                  source={reference.frontmatter.source}
                  date={reference.fields.date}/>
                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: reference.html }}/>
                <hr/>
              </div>
            )
          })
      }
    </div>
  );
}

// TODO sort order should include timestamp
// let's make a bar chart ordering
export const pageQuery = graphql`
query BibloIndexByTopic($topic: String!) {
  allMarkdownRemark(
    sort: { order: ASC, fields: [fields___date] },
    filter: {
      fields: {
      	source: {eq: "bibliography"},
      	topic: {eq: $topic}
    	}
    }
  ) {
    edges {
      node {
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
        html
      }
    }
  }
}`
