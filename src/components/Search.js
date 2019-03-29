import React, { Component } from "react";

import ArchiveLink from "../components/ArchiveLink";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: []
    };
  }

  render() {
    return (
      <div>
        <input
          style={{ width: "100%", marginBottom: "2em" }}
          type="text"
          value={this.state.query}
          onChange={this.search}
        />
        <ul>
          {this.state.results.map(page => (
            <ArchiveLink
              key={page.slug}
              to={page.slug}
              title={page.title}
              favorite={false}
            />
          ))}
        </ul>
      </div>
    );
  }

  getSearchResults(query) {
    if (!query || !window.__LUNR__) return [];
    const lunrIndex = window.__LUNR__["en"];
    const results = lunrIndex.index.search(query);
    return results.map(({ ref }) => lunrIndex.store[ref]);
  }

  search = event => {
    const query = event.target.value;
    const results = this.getSearchResults(query);
    this.setState(s => {
      return {
        results,
        query
      };
    });
  };
}
