import React from 'react'
import { css } from 'glamor'

export default function Footer({ data }) {
  const year = (new Date()).getFullYear();
  return (
    <div css={{
        fontSize: "smaller"
    }}>
        <hr/>
        Copyright &copy; 2014&ndash;{year} David Howell<br/>
        <a href="https://twitter.com/dehowell">@dehowell</a><br/>
        <a href="javascript:gaOptout();">Deactive Google Analytics</a><br/>
    </div>
  )
}
