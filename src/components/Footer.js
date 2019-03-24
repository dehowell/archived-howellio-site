import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby";
import React from "react";

const Footer = styled.footer`
  fontsize: "smaller";
`;

export default () => {
  const year = new Date().getFullYear();
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          site {
            siteMetadata {
              author
              social {
                twitter
              }
            }
          }
        }
      `}
      render={data => {
        let twitterLink = `https://twitter.com/${
          data.site.siteMetadata.social.twitter
        }`;
        return (
          <Footer>
            <hr />
            &copy; 2014&ndash;{year} {data.site.siteMetadata.author}
            <br />
            <a href={twitterLink}>@{data.site.siteMetadata.social.twitter}</a>
            <br />
          </Footer>
        );
      }}
    />
  );
};

// TODO re-add google analytics
// <a href="javascript:gaOptOut();">Deactive Google Analytics</a>
// <br />
