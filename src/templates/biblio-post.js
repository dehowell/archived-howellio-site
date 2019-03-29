import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";

import BibliographyRef from "../components/BibliographyRef";
import Head from "../components/Head";
import Layout from "../components/layout";

const BibliographyFooter = styled.footer`
  font-size: smaller;
`;

const BibliographyIndexRef = props => {
  let link = `/bibliography/${props.topic}`;
  return (
    <BibliographyFooter>
      <p>
        This post is part of an annotated bibliography on{" "}
        <a href={link}>{props.name}</a>.
      </p>
    </BibliographyFooter>
  );
};

export default ({ data }) => {
  const reference = data.markdownRemark;
  return (
    <Layout>
      <Head title={`Notes on "${reference.frontmatter.source.title}"`} />
      <article>
        <BibliographyRef
          author={reference.frontmatter.source.author}
          title={reference.frontmatter.source.title}
          slug={reference.fields.slug}
          source={reference.frontmatter.source}
          date={reference.fields.date}
        />
        <div dangerouslySetInnerHTML={{ __html: reference.html }} />
        <BibliographyIndexRef
          name={reference.fields.topicName}
          topic={reference.fields.topic}
        />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query BiblioPostBySlug($slug: String) {
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
`;
