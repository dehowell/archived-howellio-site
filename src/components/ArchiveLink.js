import { css } from "@emotion/core";
import React from "react";
import { Link } from "gatsby";

const ArchiveLink = props => {
  const content = props.favorite ? " ★" : "";
  return (
    <li
      css={css`
        list-style-type: none;
        &::after {
          font-size: smaller;
          content: "${content}";
          color: #767676;
        }
      `}
    >
      <Link to={props.to}>{props.title}</Link>
    </li>
  );
};

export default ArchiveLink;
