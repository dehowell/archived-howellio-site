import React from 'react'
import Link from 'gatsby-link'
import { css } from 'glamor'


const NavItem = props => (
  <li css={{ marginRight: `20px`}}>
    <Link to={props.to}>{props.title}</Link>
  </li>
)


const Header = () => (
  <div>
    <h1 css={{
      marginBottom: 0
    }}>
      <Link to="/">
        howell.io
      </Link>
    </h1>
    <p css={{
      color: '#767676',
      fontStyle: 'italic'
    }}>
      As unprincipled as the gods, and as much a jack-of-all-trades.
    </p>
    <nav>
      <ul css={{
          display: `flex`,
          listStyle: `none`,
          marginLeft: `0`
        }}
      >
        <NavItem to="/about/" title="About"/>
        <NavItem to="/now/" title="Now"/>
        <NavItem to="/codex-vitae/" title="Codex Vitae"/>
        <NavItem to="/archive/" title="Archive"/>
      </ul>
    </nav>
  </div>
)

export default Header
