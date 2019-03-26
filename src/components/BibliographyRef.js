import styled from "@emotion/styled";
import React from "react";

const Citation = styled.cite`
  margin-bottom: 1em;
  font-style: normal;
`;

const CitationTitle = styled.h2`
  margin-bottom: 0;
`;

const BibliographyRef = props => {
  return (
    <Citation>
      <CitationTitle>
        <a href={props.slug}>
          {props.author}. {props.title}
        </a>
      </CitationTitle>
      Notes from {props.date}. [<a href={props.source.url}>source</a>]
    </Citation>
  );
};

export default BibliographyRef;
