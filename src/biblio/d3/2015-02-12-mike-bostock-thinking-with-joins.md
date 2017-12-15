---
title: "Mike Bostock: \"Thinking With Joins\""
layout: biblio
tags:
  - d3
source:
  author: Mike Bostock
  url: http://bost.ocks.org/mike/join/
  title: "Thinking With Joins"
---

Discusses the motivation behind the declarative style of D3 (as opposed to iterating manually over your data to create and modify DOM elements) as well as defining how the join between data and DOM elements translates to the enter, update, and exit selections.

The Venn diagram is handy:

- enter: The complement of the DOM elements with respect to the data.
- exit: The complement of the data with respect to the DOM elements.
- update:  The intersection of the data with the DOM elements.
