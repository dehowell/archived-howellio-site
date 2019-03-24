import styled from "@emotion/styled";
import { Link, StaticQuery, graphql } from "gatsby";
import React from "react";

// TODO replace px styling everywhere with em or things derived from typography
// TODO move Helmet here?
// TODO replace explicit gray color with gray call
const NavItem = props => (
  <li style={{ marginRight: "20px" }}>
    <Link to={props.to}>{props.title}</Link>
  </li>
);

const Title = styled.h1`
  margin: 0;
`;

const Description = styled.p`
  font-style: italic;
  color: #767676;
  margin-bottom: 0.5em;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 0;
`;

export default () => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <header>
        <Title>
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </Title>
        <Description>{data.site.siteMetadata.description}</Description>
        <nav>
          <Menu>
            <NavItem to="/about/" title="About" />
            <NavItem to="/archive/" title="Archive" />
            <NavItem to="/codex-vitae/" title="Codex Vitae" />
          </Menu>
        </nav>
      </header>
    )}
  />
);
