import React from "react";
import { graphql } from "gatsby";

function toMobileDoc(node) {
  return {
    version: "0.3.1",
    markups: [],
    atoms: [],
    cards: [
      [
        "markdown",
        {
          markdown: node.rawMarkdownBody
        }
      ]
    ],
    sections: [[10, 0]]
  };
}

export default ({ data }) => {
  let ghostExport = {
    meta: {
      exported_on: Date.now(),
      version: "3.0.0"
    },
    data: {
      users: [
        {
          id: "1",
          name: "David Howell",
          email: "dehowell@gmail.com"
        }
      ],
      tags: [
        {
          id: "1",
          name: "Readings"
        }
      ]
    }
  };

  let isReading = [];

  // IMAGES in Ghost end up in relatives paths like this
  // /content/images/2019/10/editorial_process-2.png

  ghostExport.data.posts = data.allMarkdownRemark.edges.map(
    ({ node }, index) => {
      let postId = `${index}`;

      if (node.frontmatter.title.indexOf("Readings: ") == 0) {
        isReading.push(postId);
      }

      return {
        id: postId,
        author_id: "1",
        title: node.frontmatter.title,
        mobiledoc: JSON.stringify(toMobileDoc(node)),
        status: "published",
        published_at: Date.parse(node.fields.date) /* convert */
      };
    }
  );

  /* apply the imported tag to every post */
  ghostExport.data.posts_tags = [
    ...isReading.map(postId => ({ tag_id: "1", post_id: postId }))
  ];

  return (
    <pre>
      <code>{JSON.stringify(ghostExport, null, 2)}</code>
    </pre>
  );
};

export const pageQuery = graphql`
  query ExportQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [fields___date] }
      filter: { fields: { source: { eq: "posts" } } }
    ) {
      edges {
        node {
          id
          fields {
            source
            draft
            slug
            topic
            topicName
            date
          }
          frontmatter {
            title
            layout
            template
            date
          }
          rawMarkdownBody
          html
        }
      }
    }
  }
`;
