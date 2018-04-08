import React from 'react';


const BibliographyRef = props => {
  return (
    <div css={{marginBottom: "20px"}}>
      <h2 css={{marginBottom: 0}} >
        <a href={props.slug}>{props.author}. {props.title}</a>
      </h2>
      Notes from {props.date}. [<a href={props.source.url}>source</a>]
      </div>
    )
};

export default BibliographyRef
