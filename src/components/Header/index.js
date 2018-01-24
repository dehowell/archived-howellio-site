import React from 'react'
import Link from 'gatsby-link'
import { css } from 'glamor'


const NavItem = props => (
  <li css={{ marginRight: `20pt`}}>
    <Link to={props.to}>{props.title}</Link>
  </li>
)


const Header = () => (
  <div>
    <h1>
      <Link to="/">
        howell.io
      </Link>
    </h1>
    <nav

    >
      <ul css={{
        display: `flex`,
        listStyle: `none`,
        marginLeft: `0`
      }}>
        <NavItem to="/" title="Home"/>
        <NavItem to="/about/" title="About"/>
        <NavItem to="/now/" title="Now"/>
        <NavItem to="/codex-vitae/" title="Codex Vitae"/>
        <NavItem to="/archive/" title="Archive"/>
      </ul>
    </nav>
  </div>
)

export default Header
