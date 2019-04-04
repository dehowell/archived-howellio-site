import styled from "@emotion/styled";
import { StaticQuery, graphql } from "gatsby";
import React from "react";
import { FaEnvelope, FaTwitter } from "react-icons/fa";

const Footer = styled.footer`
  font-size: smaller;
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
            <a href={twitterLink}>
              <FaTwitter /> @{data.site.siteMetadata.social.twitter}
            </a>
            <br />
            <a href="https://buttondown.email/dehowell">
              <FaEnvelope /> Subscribe to my newsletter, The Marginalia Club
            </a>
            <a href="javascript:gaOptOut();">Deactive Google Analytics</a>
            <br />
          </Footer>
        );
      }}
    />
  );
};
