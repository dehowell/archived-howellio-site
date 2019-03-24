import styled from "@emotion/styled";
import { Link, StaticQuery, graphql } from "gatsby";
import React from "react";

import { rhythm } from "../utils/typography";

const Title = styled.h1`
  margin: 0;
`;

const Description = styled.p`
  font-style: italic;
  color: #767676;
  margin-bottom: ${rhythm(1 / 2)};
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 0;
`;

const MenuItem = styled.li`
  margin-right: ${rhythm(1 / 2)};
`;

const NavItem = props => (
  <MenuItem>
    <Link to={props.to}>{props.title}</Link>
  </MenuItem>
);

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
