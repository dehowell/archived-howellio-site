import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

const NavItem = props => (
  <li>
    <Link to={props.to}>{props.title}</Link>
  </li>
);

const Header = () => (
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
        <h1>
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </h1>
        <p>{data.site.siteMetadata.description}</p>
        <nav>
          <ul>
            <NavItem to="/about/" title="About" />
            <NavItem to="/archive/" title="Archive" />
            <NavItem to="/codex-vitae/" title="Codex Vitae" />
          </ul>
        </nav>
      </header>
    )}
  />
);

export default Header;
