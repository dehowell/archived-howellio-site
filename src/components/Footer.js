import React from "react";
import { StaticQuery, graphql } from "gatsby";

const Footer = () => {
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
          <footer style={{ fontSize: "smaller" }}>
            <hr />
            &copy; 2014&ndash;{year} {data.site.siteMetadata.author}
            <br />
            <a href={twitterLink}>@{data.site.siteMetadata.social.twitter}</a>
            <br />
          </footer>
        );
      }}
    />
  );
};

export default Footer;
// TODO re-add google analytics
// <a href="javascript:gaOptOut();">Deactive Google Analytics</a>
// <br />
