import React from 'react'
import Link from 'gatsby-link'
import { css } from 'glamor'

export default function Footer({ data }) {
  const year = (new Date()).getFullYear();
  return (
    <div css={{
        fontSize: "smaller"
    }}>
        Copyright &copy; 2014&ndash;{year} David Howell<br/>
        <a href="https://twitter.com/dehowell">@dehowell</a><br/>
    </div>
  )
}
