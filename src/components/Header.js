import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

// TODO replace px styling everywhere with em or things derived from typography
// TODO move Helmet here?
// TODO replace explicit gray color with gray call
const NavItem = props => (
  <li style={{ marginRight: "20px" }}>
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
        <h1 style={{ marginBottom: 0 }}>
          <Link to="/">{data.site.siteMetadata.title}</Link>
        </h1>
        <p style={{ color: "#767676", fontStyle: "italic" }}>
          {data.site.siteMetadata.description}
        </p>
        <nav>
          <ul style={{ display: "flex", listStyle: "none", marginLeft: "0" }}>
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
