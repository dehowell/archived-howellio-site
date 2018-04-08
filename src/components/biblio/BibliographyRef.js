import React from 'react';
import { css } from 'glamor'

const BibliographyRef = props => (
  <div css={{
    fontSize: 'larger'
  }}>
    {props.author}. {props.title} [<a href={props.source.url}>source</a>]
  </div>
)

export default BibliographyRef
